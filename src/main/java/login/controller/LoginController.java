package login.controller;

import login.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        if (user.getEmail().equals("mstoyanovca@gmail.com") && user.getPassword().equals("password")) {
            return new ResponseEntity<>(
                    new User(1234567890L, "Martin", "Stoyanov", user.getEmail(), "", "admin", true),
                    HttpStatus.OK);
        } else {
            return new ResponseEntity<>(
                    new User(0L, "", "", "", "", "", false),
                    HttpStatus.FORBIDDEN);
        }
    }
}
