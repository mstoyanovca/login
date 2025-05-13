package login.controller;

import login.model.User;
import login.repository.UserRepository;
import login.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Autowired
    public LoginController(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        // User existingUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if (user.getEmail().equals("mstoyanovca@gmail.com") && user.getPassword().equals("password")) {
            return ResponseEntity.ok(jwtService.generate(user.getEmail()));
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.FORBIDDEN);
        }
    }
}
