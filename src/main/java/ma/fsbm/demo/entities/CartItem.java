package ma.fsbm.demo.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor; // زيدي هادي
import lombok.AllArgsConstructor; // وزيدي هادي

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private int quantity;
}