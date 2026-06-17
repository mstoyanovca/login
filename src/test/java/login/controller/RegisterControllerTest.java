package login.controller;

import login.WebSecurityConfiguration;
import login.model.Role;
import login.model.User;
import login.repository.UserRepository;
import login.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import tools.jackson.databind.ObjectMapper;

import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ContextConfiguration
@Import(WebSecurityConfiguration.class)
@WebMvcTest(RegisterController.class)
public class RegisterControllerTest {
    @Autowired
    private WebApplicationContext context;
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserRepository userRepository;
    @MockitoBean
    private PasswordEncoder passwordEncoder;

    @MockitoBean
    private UserDetailsService userDetailsService;
    @MockitoBean
    private JwtService jwtService;

    private User user;

    @BeforeEach
    public void setup() {
        // 17.2.1 Setting Up MockMvc and Spring Security
        // https://docs.spring.io/spring-security/site/docs/5.2.0.RELEASE/reference/html/test.html
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
        user = new User(101L, "Martin", "Stoyanov", "abc@abc.com", "password", Role.ADMIN, false);
    }

    @Test
    @WithAnonymousUser
    public void registerExistingUserTest() throws Exception {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        mockMvc
                .perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user))
                )
                .andExpect(status().isConflict());

        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    @WithAnonymousUser
    public void registerNewUserTest() throws Exception {
        String encodedPassword = UUID.randomUUID().toString();
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(user.getPassword())).thenReturn(encodedPassword);

        mockMvc
                .perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user))
                )
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(user.getId()))
                .andExpect(jsonPath("$.firstName").value(user.getFirstName()))
                .andExpect(jsonPath("$.lastName").value(user.getLastName()))
                .andExpect(jsonPath("$.email").value(user.getEmail()))
                .andExpect(jsonPath("$.password").value(""))
                .andExpect(jsonPath("$.role").value(Role.USER.toString()))
                .andExpect(jsonPath("$.enabled").value(true));

        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verify(passwordEncoder, times(1)).encode(user.getPassword());
        user.setEnabled(true);
        user.setPassword("");
        user.setRole(Role.USER);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    @WithAnonymousUser
    public void registerInvalidUserTest() throws Exception {
        user.setFirstName("");
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        mockMvc
                .perform(post("/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user))
                )
                .andExpect(status().isBadRequest());

        verifyNoInteractions(userRepository);
        verifyNoInteractions(passwordEncoder);
    }
}
