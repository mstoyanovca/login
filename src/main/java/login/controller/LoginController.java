package login.controller;

import login.model.User;
import login.service.JwtService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private static final Logger LOGGER = LogManager.getLogger();

    @Autowired
    public LoginController(JwtService jwtService, AuthenticationManager authManager) {
        this.jwtService = jwtService;
        this.authManager = authManager;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            LOGGER.info("Logged in {}", user.getEmail());
            return ResponseEntity.ok(jwtService.generate(user.getEmail()));
        } catch (AuthenticationException e) {
            LOGGER.info("Bad credentials for {}", user.getEmail());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/test")
    public String test() {
        return "test REST endpoint";
    }
}
