package ma.fsbm.demo;

import ma.fsbm.demo.entities.Product;
import ma.fsbm.demo.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataRestorer {

    @Bean
    CommandLineRunner start(ProductRepository productRepository) {
        return args -> {
            productRepository.save(new Product(null, "MacBook Pro", "M3 Chip, 16GB RAM", 25000.0, "mac.jpg", 10));
            productRepository.save(new Product(null, "iPhone 15", "128GB, Blue", 12000.0, "iphone.jpg", 5));
            productRepository.save(new Product(null, "AirPods Pro", "Noise Cancelling", 2500.0, "airpods.jpg", 20));

            System.out.println(" Les produits ont été ajoutés avec succès");
        };
    }
}
