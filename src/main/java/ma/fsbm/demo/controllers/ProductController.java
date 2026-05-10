package ma.fsbm.demo.controllers;

import ma.fsbm.demo.entities.Product;
import ma.fsbm.demo.services.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductServices productService;


    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }


    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeProduct(@PathVariable Long id){
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {

        productDetails.setId(id);
        return ResponseEntity.ok(productService.saveProduct(productDetails));
    }
}