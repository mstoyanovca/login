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
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import tools.jackson.databind.ObjectMapper;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ContextConfiguration
@Import(WebSecurityConfiguration.class)
@WebMvcTest(ResetPasswordController.class)
public class ResetPasswordControllerTest {
    @Autowired
    private WebApplicationContext context;
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserRepository userRepository;

    @MockitoBean
    private UserDetailsService userDetailsService;
    @MockitoBean
    private JwtService jwtService;

    private User user;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
        user = new User(0L, "", "", "c@d.com", "", Role.USER, false);
    }

    @Test
    @WithAnonymousUser
    public void resetPasswordExistingUserTest() throws Exception {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        mockMvc
                .perform(post("/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user))
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

        verify(userRepository, times(1)).findByEmail(user.getEmail());
        // TODO: implement email service:
        // verify(emailService, times(1)).sendPasswordResetLink(user.getEmail());
    }

    @Test
    @WithAnonymousUser
    public void resetPasswordUnknownUserTest() throws Exception {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        mockMvc
                .perform(post("/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user))
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

        verify(userRepository, times(1)).findByEmail(user.getEmail());
    }

}
