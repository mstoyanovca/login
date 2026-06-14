package login.controller;

import login.WebSecurityConfiguration;
import login.repository.UserRepository;
import login.service.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(RegisterController.class)
public class RegisterControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserRepository userRepository;
    @MockitoBean
    private PasswordEncoder passwordEncoder;



}
