package login.controller;

import login.model.User;
import login.repository.UserRepository;
import login.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final UserRepository userRepository;

    @Autowired
    public LoginController(JwtService jwtService, AuthenticationManager authManager, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.authManager = authManager;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User u = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
            authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("User " + user.getEmail() + " not found", HttpStatus.UNAUTHORIZED);
        }
        return ResponseEntity.ok(jwtService.generate(user.getEmail()));
    }
}
