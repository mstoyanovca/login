package login.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class UserTest {
    @Test
    public void noArgumentConstructorTest() {
        //noinspection ObviousNullCheck
        assertNotNull(new User());
    }
}
