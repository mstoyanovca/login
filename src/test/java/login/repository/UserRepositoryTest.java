package login.repository;

import login.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    private User testUser;

    @BeforeEach
    public void beforeEach() {
        testUser = new User(0L, "Martin", "Stoyanov", "abc@gmail.com", "password", "admin", false);
        userRepository.save(testUser);
    }

    @AfterEach
    public void afterEach() {
        userRepository.delete(testUser);
    }

    @Test
    void findByIdTest() {
        User savedUser = userRepository.findById(testUser.getId()).orElse(null);
        assertEquals(testUser.getFirstName(), savedUser.getFirstName());
        assertEquals(testUser.getLastName(), savedUser.getLastName());
        assertEquals(testUser.getEmail(), savedUser.getEmail());
        assertEquals(testUser.getPassword(), savedUser.getPassword());
        assertEquals(testUser.getRole(), savedUser.getRole());
        assertEquals(testUser.isActive(), savedUser.isActive());
    }

    @Test
    void findByEmail() {
        User savedUser = userRepository.findByEmail(testUser.getEmail()).get();
        assertEquals(testUser.getFirstName(), savedUser.getFirstName());
        assertEquals(testUser.getLastName(), savedUser.getLastName());
        assertEquals(testUser.getEmail(), savedUser.getEmail());
        assertEquals(testUser.getPassword(), savedUser.getPassword());
        assertEquals(testUser.getRole(), savedUser.getRole());
        assertEquals(testUser.isActive(), savedUser.isActive());
    }

    @Test
    void findByEmailAndPasswordTest() {
        User savedUser = userRepository.findByEmailAndPassword(testUser.getEmail(), testUser.getPassword());
        assertEquals(testUser.getFirstName(), savedUser.getFirstName());
        assertEquals(testUser.getLastName(), savedUser.getLastName());
        assertEquals(testUser.getEmail(), savedUser.getEmail());
        assertEquals(testUser.getPassword(), savedUser.getPassword());
        assertEquals(testUser.getRole(), savedUser.getRole());
        assertEquals(testUser.isActive(), savedUser.isActive());
    }

    @Test
    void updateTest() {
        User savedUser = userRepository.findById(testUser.getId()).orElse(null);
        savedUser.setFirstName("John");
        savedUser.setLastName("Smith");
        savedUser.setEmail("a@a.com");
        savedUser.setPassword("change_it");
        savedUser.setRole("user");
        savedUser.setActive(true);
        userRepository.save(savedUser);

        savedUser = userRepository.findById(testUser.getId()).orElse(null);
        assertEquals("John", savedUser.getFirstName());
        assertEquals("Smith", savedUser.getLastName());
        assertEquals("a@a.com", savedUser.getEmail());
        assertEquals("change_it", savedUser.getPassword());
        assertEquals("user", savedUser.getRole());
        assertEquals(true, savedUser.isActive());
    }
}
