package login.controller;

import login.WebSecurityConfiguration;
import login.model.Role;
import login.model.User;
import login.repository.UserRepository;
import login.service.JwtAuthenticationFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

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
    @MockitoBean
    private UserRepository userRepository;
    @MockitoBean
    private PasswordEncoder passwordEncoder;

    @MockitoBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    @WithMockUser(username = "a@a.com", roles = "USER")
    public void accountTest() throws Exception {
        User user = new User(1L, "Martin", "Stoyanov", "a@a.com", "password", Role.USER, false);
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        mockMvc
                .perform(get("/account")
                        .accept(MediaType.APPLICATION_JSON)
                        .with(user("a@a.com").roles("USER"))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.firstName").value("Martin"))
                .andExpect(jsonPath("$.lastName").value("Stoyanov"));
    }
}
