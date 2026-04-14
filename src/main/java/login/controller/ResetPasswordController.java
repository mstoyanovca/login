package login.controller;

import login.model.User;
import login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResetPasswordController {
    private final UserRepository userRepository;

    @Autowired
    public ResetPasswordController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/reset-password")
    public ResponseEntity<User> resetPassword(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            // TODO: sent an email with a password reset link
        }
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
}
