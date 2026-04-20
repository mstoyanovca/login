package login.model;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

import static login.model.Role.ADMIN;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AuthUserTest {
    private final User user = new User(1L, "John", "Smith", "abc@gmail.com", "password", ADMIN, true);
    private final AuthUser authUser = new AuthUser(user);

    @Test
    public void getUsernameTest() {
        assertEquals("abc@gmail.com", authUser.getUsername());
    }

    @Test
    public void getPasswordTest() {
        assertEquals("password", authUser.getPassword());
    }

    @Test
    public void getAuthoritiesTest() {
        assertEquals(List.of(new SimpleGrantedAuthority(user.getRole().toString())), authUser.getAuthorities());
    }
}
