package login.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class JwtServiceTest {
    @Autowired
    private JwtService jwtService;
    private final String username = "abc@gmail.com";
    private String jwtToken;

    @BeforeEach
    public void beforeEach() {
        jwtToken = jwtService.generate(username);
    }

    @Test
    void validateTest() {
        assertTrue(jwtService.validate(jwtToken));
    }

    @Test
    void getUsernameTest() {
        assertEquals(username, jwtService.getUsername(jwtToken));
    }
}
