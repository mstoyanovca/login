package login.repository;

import login.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import static login.model.Role.ROLE_ADMIN;
import static login.model.Role.ROLE_USER;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    private User testUser;

    @BeforeEach
    public void beforeEach() {
        testUser = new User(null, "Martin", "Stoyanov", "abc@gmail.com", "password", ROLE_ADMIN, true);
        userRepository.save(testUser);
    }

    @AfterEach
    public void afterEach() {
        userRepository.delete(testUser);
    }

    @Test
    void findByIdTest() {
        User savedUser = userRepository.findById(testUser.getId()).orElse(null);
        assertNotNull(savedUser);

        assertEquals(testUser.getFirstName(), savedUser.getFirstName());
        assertEquals(testUser.getLastName(), savedUser.getLastName());
        assertEquals(testUser.getEmail(), savedUser.getEmail());
        assertEquals(testUser.getPassword(), savedUser.getPassword());
        assertEquals(testUser.getRole(), savedUser.getRole());
        assertEquals(testUser.isEnabled(), savedUser.isEnabled());
    }

    @Test
    void findByEmailTest() {
        User savedUser = userRepository.findByEmail(testUser.getEmail()).orElse(null);
        assertNotNull(savedUser);

        assertEquals(testUser.getFirstName(), savedUser.getFirstName());
        assertEquals(testUser.getLastName(), savedUser.getLastName());
        assertEquals(testUser.getEmail(), savedUser.getEmail());
        assertEquals(testUser.getPassword(), savedUser.getPassword());
        assertEquals(testUser.getRole(), savedUser.getRole());
        assertEquals(testUser.isEnabled(), savedUser.isEnabled());
    }

    @Test
    void findByEmailAndPasswordTest() {
        User savedUser = userRepository.findByEmailAndPassword(testUser.getEmail(), testUser.getPassword());

        assertEquals(testUser.getFirstName(), savedUser.getFirstName());
        assertEquals(testUser.getLastName(), savedUser.getLastName());
        assertEquals(testUser.getEmail(), savedUser.getEmail());
        assertEquals(testUser.getPassword(), savedUser.getPassword());
        assertEquals(testUser.getRole(), savedUser.getRole());
        assertEquals(testUser.isEnabled(), savedUser.isEnabled());
    }

    @Test
    void updateTest() {
        User savedUser = userRepository.findById(testUser.getId()).orElse(null);
        assertNotNull(savedUser);

        savedUser.setFirstName("John");
        savedUser.setLastName("Smith");
        savedUser.setEmail("a@a.com");
        savedUser.setPassword("change_it");
        savedUser.setRole(ROLE_USER);
        savedUser.setEnabled(true);
        userRepository.save(savedUser);

        savedUser = userRepository.findById(testUser.getId()).orElse(null);
        assertNotNull(savedUser);

        assertEquals("John", savedUser.getFirstName());
        assertEquals("Smith", savedUser.getLastName());
        assertEquals("a@a.com", savedUser.getEmail());
        assertEquals("change_it", savedUser.getPassword());
        assertEquals(ROLE_USER, savedUser.getRole());
        assertTrue(savedUser.isEnabled());
    }
}
