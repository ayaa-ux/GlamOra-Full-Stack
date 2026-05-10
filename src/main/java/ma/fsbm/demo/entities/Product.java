package ma.fsbm.demo.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty; // ضرورية جداً للربط مع React

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private double price;

    @Column(name = "image_url", columnDefinition = "TEXT")
    @JsonProperty("imageUrl")
    private String imageUrl;

    private int quantity;
}