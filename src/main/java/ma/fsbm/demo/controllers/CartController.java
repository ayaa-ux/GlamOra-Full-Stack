package ma.fsbm.demo.controllers;

import ma.fsbm.demo.entities.CartItem;
import ma.fsbm.demo.entities.User;
import ma.fsbm.demo.entities.Product;
import ma.fsbm.demo.repositories.CartItemRepository;
import ma.fsbm.demo.repositories.UserRepository;
import ma.fsbm.demo.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/user/{userId}")
    public List<CartItem> getCartByUserId(@PathVariable Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartItem cartItem) {

        if (cartItem.getUser() == null || cartItem.getUser().getId() == null ||
                cartItem.getProduct() == null || cartItem.getProduct().getId() == null) {
            return ResponseEntity.badRequest().body("Erreur: IDs user ou product manquants dans le JSON");
        }

        Optional<User> userOpt = userRepository.findById(cartItem.getUser().getId());
        Optional<Product> productOpt = productRepository.findById(cartItem.getProduct().getId());

        if (userOpt.isEmpty() || productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Erreur: User/Product introuvable dans la DB");
        }

        List<CartItem> existingItems = cartItemRepository.findByUserId(userOpt.get().getId());
        Optional<CartItem> existingItem = existingItems.stream()
                .filter(item -> item.getProduct().getId().equals(productOpt.get().getId()))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem itemToUpdate = existingItem.get();
            itemToUpdate.setQuantity(itemToUpdate.getQuantity() + cartItem.getQuantity());
            return ResponseEntity.ok(cartItemRepository.save(itemToUpdate));
        }

        cartItem.setUser(userOpt.get());
        cartItem.setProduct(productOpt.get());

        return ResponseEntity.ok(cartItemRepository.save(cartItem));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFromCart(@PathVariable Long id) {
        cartItemRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}