package login.controller;

import login.model.User;
import login.repository.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResetPasswordController {
    private final UserRepository userRepository;
    private static final Logger LOGGER = LogManager.getLogger();

    @Autowired
    public ResetPasswordController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/reset-password")
    public ResponseEntity<User> resetPassword(@RequestBody User user) {
        LOGGER.info("Password reset request for {}", user.getEmail());
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            LOGGER.info("Sent password reset link to {}", user.getEmail());
            // TODO: send an email with a password reset link
        } else {
            LOGGER.info("{} is not registered", user.getEmail());
        }
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
}
