package login.controller;

import login.WebSecurityConfiguration;
import login.model.Role;
import login.model.User;
import login.model.UserDetailsImpl;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import tools.jackson.databind.ObjectMapper;

import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ContextConfiguration
@WebMvcTest(AccountController.class)
@Import(WebSecurityConfiguration.class)
public class AccountControllerTest {
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

    private final User user = new User(1L, "Martin", "Stoyanov", "a@a.com", "password", Role.USER, false);

    @BeforeEach
    public void setup() {
        // 17.2.1 Setting Up MockMvc and Spring Security
        // https://docs.spring.io/spring-security/site/docs/5.2.0.RELEASE/reference/html/test.html
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    @WithMockUser(username = "a@a.com", roles = {"USER", "ADMIN"})
    public void accountAuthorizedTest() throws Exception {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        when(jwtService.isValid("valid_token")).thenReturn(true);
        when(jwtService.getEmail("valid_token")).thenReturn("a@a.com");
        when(userDetailsService.loadUserByUsername("a@a.com")).thenReturn(new UserDetailsImpl(user));

        mockMvc.perform(get("/account")
                        .header("Authorization", "Bearer valid_token")
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(user.getId()))
                .andExpect(jsonPath("$.firstName").value(user.getFirstName()))
                .andExpect(jsonPath("$.lastName").value(user.getLastName()))
                .andExpect(jsonPath("$.email").value(user.getEmail()))
                .andExpect(jsonPath("$.password").value(user.getPassword()))
                .andExpect(jsonPath("$.role").value(user.getRole().toString()))
                .andExpect(jsonPath("$.enabled").value(user.isEnabled()));
    }

    @Test
    @WithMockUser(username = "a@a.com", roles = {"USER", "ADMIN"})
    public void accountAuthorizedNotFoundTest() throws Exception {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        mockMvc.perform(get("/account")
                        .header("Authorization", "Bearer valid_token")
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isInternalServerError());
    }

    @Test
    @WithAnonymousUser
    public void accountUnauthorizedTest() throws Exception {
        mockMvc.perform(get("/account")
                        .header("Authorization", "Bearer invalid_token")
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "a@a.com", roles = {"USER", "ADMIN"})
    public void updateAuthorizedTest() throws Exception {
        when(passwordEncoder.encode(user.getPassword())).thenReturn(UUID.randomUUID().toString());

        mockMvc
                .perform(put("/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(user.getId()))
                .andExpect(jsonPath("$.firstName").value(user.getFirstName()))
                .andExpect(jsonPath("$.lastName").value(user.getLastName()))
                .andExpect(jsonPath("$.email").value(user.getEmail()))
                .andExpect(jsonPath("$.password").value(""))
                .andExpect(jsonPath("$.role").value(user.getRole().toString()))
                .andExpect(jsonPath("$.enabled").value(user.isEnabled()));
    }

    @Test
    @WithAnonymousUser
    public void updateUnauthorizedTest() throws Exception {
        mockMvc.perform(put("/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user))
                )
                .andExpect(status().isForbidden());
    }
}
