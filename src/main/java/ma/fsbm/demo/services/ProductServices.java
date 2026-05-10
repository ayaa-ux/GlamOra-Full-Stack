package ma.fsbm.demo.services;

import ma.fsbm.demo.entities.Product;
import ma.fsbm.demo.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductServices {

    @Autowired
    private ProductRepository productRepository;


    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Long id){
        productRepository.deleteById(id);
    }


    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
}