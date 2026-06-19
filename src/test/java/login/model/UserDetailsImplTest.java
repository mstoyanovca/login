package login.model;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

import static login.model.Role.ROLE_ADMIN;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserDetailsImplTest {
    private final User user = new User(1L, "John", "Smith", "abc@gmail.com", "password", ROLE_ADMIN, true);
    private final UserDetailsImpl authUser = new UserDetailsImpl(user);

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
