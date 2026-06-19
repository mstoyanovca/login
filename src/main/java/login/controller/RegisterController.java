package login.controller;

import jakarta.validation.Valid;
import login.model.User;
import login.repository.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

import static login.model.Role.ROLE_USER;

@RestController
public class RegisterController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger LOGGER = LogManager.getLogger();

    @Autowired
    public RegisterController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            LOGGER.info("{} is registered", user.getEmail());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            user.setPassword(Objects.requireNonNull(passwordEncoder.encode(user.getPassword())));
            // TODO: email an account activation link, valid for a few minutes, to enable the user:
            user.setEnabled(true);
            user.setRole(ROLE_USER);
            userRepository.save(user);
            user.setPassword("");
            LOGGER.info("Registered: {}", user.toString());
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        }
    }
}
