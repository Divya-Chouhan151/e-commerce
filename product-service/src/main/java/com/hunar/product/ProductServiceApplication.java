package com.hunar.product;

import com.hunar.product.model.Product;
import com.hunar.product.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
@EnableDiscoveryClient
public class ProductServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                Product s1 = Product.builder()
                        .title("Pure Woollen Sweater")
                        .description("Hand-knitted with 100% organic wool. Warm and stylish.")
                        .price(BigDecimal.valueOf(45.99))
                        .stockQuantity(10)
                        .build();

                Product s2 = Product.builder()
                        .title("Winter Scarfs")
                        .description("Traditional pattern scarf, perfect for heavy winters.")
                        .price(BigDecimal.valueOf(19.50))
                        .stockQuantity(25)
                        .build();

                Product s3 = Product.builder()
                        .title("Handmade Baby Blankets")
                        .description("Softest yarn for your little one. Skin friendly.")
                        .price(BigDecimal.valueOf(29.99))
                        .stockQuantity(20)
                        .build();

                Product s4 = Product.builder()
                        .title("Artisan Cardigans")
                        .description("Elegant beige cardigan with wooden buttons.")
                        .price(BigDecimal.valueOf(55.00))
                        .stockQuantity(20)
                        .build();
                
                Product s5 = Product.builder()
                        .title("Handmade Gloves")
                        .description("Skin Comforting gloves.")
                        .price(BigDecimal.valueOf(200.00))
                        .stockQuantity(30)
                        .build(); 
                
                Product s6 = Product.builder()
                        .title("Handmade Socks")
                        .description("Skin Comforting socks.")
                        .price(BigDecimal.valueOf(150.00))
                        .stockQuantity(30)
                        .build();                 

                productRepository.saveAll(List.of(s1, s2, s3, s4, s5, s6));
            }
        };
    }
}
