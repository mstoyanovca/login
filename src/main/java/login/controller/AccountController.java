package login.controller;

import login.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
    @GetMapping("/account")
    public ResponseEntity<User> account() {
        return ResponseEntity.ok(new User(1234567890L, "Martin", "Stoyanov", "abc@gmail.com", "password", "admin", false));
    }
}
