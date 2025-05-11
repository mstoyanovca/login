package login.controller;

import login.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @GetMapping("/login")
    public User login() {
        return new User(1234567890L, "Martin", "Stoyanov", "abc@gmail.com", "password", "admin", false);
    }
}
