package login.controller;

import login.WebSecurityConfiguration;
import login.model.Role;
import login.model.User;
import login.repository.UserRepository;
import login.service.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.HandlerExceptionResolver;
import tools.jackson.databind.ObjectMapper;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AccountController.class)
@Import(WebSecurityConfiguration.class)
public class AccountControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserRepository userRepository;
    @MockitoBean
    private PasswordEncoder passwordEncoder;

    @MockitoBean
    private JwtService jwtService;
    @MockitoBean
    private UserDetailsService userDetailsService;
    @MockitoBean
    private UserDetails userDetails;
    @MockitoBean
    private HandlerExceptionResolver handlerExceptionResolver;

    private final User user = new User(1L, "Martin", "Stoyanov", "a@a.com", "password", Role.USER, false);

    @Test
    @WithMockUser(username = "a@a.com", roles = {"USER", "ADMIN"})
    @WithUserDetails("a@a.com")
    public void accountTest() throws Exception {
        when(jwtService.isValid("valid_token")).thenReturn(true);
        when(jwtService.getEmail("valid_token")).thenReturn("a@a.com");
        when(userDetailsService.loadUserByUsername("a@a.com")).thenReturn(userDetails);
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        mockMvc
                .perform(get("/account")
                        .header("Authorization", "Bearer valid_token")
                        .accept(MediaType.APPLICATION_JSON)
                        .with(user(user.getEmail()).roles("USER"))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.firstName").value("Martin"))
                .andExpect(jsonPath("$.lastName").value("Stoyanov"));
    }
}
