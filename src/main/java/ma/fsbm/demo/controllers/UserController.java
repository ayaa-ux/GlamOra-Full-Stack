package ma.fsbm.demo.controllers;

import ma.fsbm.demo.entities.User;
import ma.fsbm.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Erreur: cette adresse e-mail est déjà enregistrée!");
        }


        User savedUser = userService.save(user);
        return ResponseEntity.ok(savedUser);
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        Optional<User> userOptional = userService.findByEmail(loginData.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (user.getPassword().equals(loginData.getPassword())) {
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("L'adresse e-mail ou le mot de passe est incorrect");
    }


    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.findAll();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.ok("Utilisateur supprimé !");
    }
}