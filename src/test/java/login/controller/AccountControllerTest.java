package login.controller;

import login.WebSecurityConfiguration;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import tools.jackson.databind.ObjectMapper;

import java.util.Optional;
import java.util.UUID;

import static login.model.Role.ROLE_USER;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ContextConfiguration
@Import(WebSecurityConfiguration.class)
@WebMvcTest(AccountController.class)
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

    private User user;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
        user = new User(201L, "Martin", "Stoyanov", "a@a.com", "password", ROLE_USER, true);
    }

    @Test
    @WithMockUser(username = "a@a.com", roles = {"USER", "ADMIN"})
    public void accountAuthenticatedUserTest() throws Exception {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        mockMvc.perform(get("/account")
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(user.getId()))
                .andExpect(jsonPath("$.firstName").value(user.getFirstName()))
                .andExpect(jsonPath("$.lastName").value(user.getLastName()))
                .andExpect(jsonPath("$.email").value(user.getEmail()))
                .andExpect(jsonPath("$.password").value(""))
                .andExpect(jsonPath("$.role").value(user.getRole().toString()))
                .andExpect(jsonPath("$.enabled").value(true));

        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    @WithMockUser(username = "a@a.com", roles = {"USER", "ADMIN"})
    public void accountAuthenticatedNotFoundUserTest() throws Exception {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        mockMvc.perform(get("/account")
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isInternalServerError());

        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    @WithMockUser(username = "a@a.com", roles = {"BAD_USER", "BAD_ADMIN"})
    public void accountUnauthorizedUserTest() throws Exception {
        mockMvc.perform(get("/account")
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isForbidden());

        verifyNoInteractions(userRepository);
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    @WithAnonymousUser
    public void accountUnauthenticatedUserTest() throws Exception {
        mockMvc.perform(get("/account")
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isForbidden());

        verifyNoInteractions(userRepository);
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    @WithMockUser(username = "a@a.com", roles = {"USER", "ADMIN"})
    public void updateAuthenticatedUserTest() throws Exception {
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

        verify(passwordEncoder, times(1)).encode(user.getPassword());
        user.setPassword("");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    @WithMockUser(username = "a@a.com", roles = {"BAD_USER", "BAD_ADMIN"})
    public void updateUnauthorizedUserTest() throws Exception {
        mockMvc
                .perform(put("/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user))
                )
                .andExpect(status().isForbidden());

        verifyNoInteractions(userRepository);
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    @WithAnonymousUser
    public void updateUnauthenticatedUserTest() throws Exception {
        mockMvc.perform(put("/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user))
                )
                .andExpect(status().isForbidden());

        verifyNoInteractions(userRepository);
        verifyNoInteractions(passwordEncoder);
    }

    @Test
    @WithMockUser(username = "a@a.com", roles = {"USER", "ADMIN"})
    public void updateAuthenticatedInvalidUserUserTest() throws Exception {
        user.setFirstName("");

        mockMvc.perform(put("/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user))
                )
                .andExpect(status().isBadRequest());

        verifyNoInteractions(userRepository);
        verifyNoInteractions(passwordEncoder);
    }
}
