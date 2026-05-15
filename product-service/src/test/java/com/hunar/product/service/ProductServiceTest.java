package com.hunar.product.service;

import com.hunar.product.dto.ProductRequest;
import com.hunar.product.dto.ProductResponse;
import com.hunar.product.model.Product;
import com.hunar.product.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;
    private ProductRequest productRequest;

    @BeforeEach
    void setUp() {
        product = Product.builder()
                .id(1L)
                .title("Hand Knitted Sweater")
                .description("Warm wool sweater")
                .price(BigDecimal.valueOf(50.0))
                .stockQuantity(10)
                .build();

        productRequest = ProductRequest.builder()
                .title("Hand Knitted Sweater")
                .description("Warm wool sweater")
                .price(BigDecimal.valueOf(50.0))
                .stockQuantity(10)
                .build();
    }

    @Test
    void createProduct_ShouldSaveProduct() {
        productService.createProduct(productRequest);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void getAllProducts_ShouldReturnProductList() {
        when(productRepository.findAll()).thenReturn(List.of(product));

        List<ProductResponse> responses = productService.getAllProducts();

        assertEquals(1, responses.size());
        assertEquals(product.getTitle(), responses.get(0).getTitle());
    }

    @Test
    void getProductById_ShouldReturnProduct_WhenExists() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ProductResponse response = productService.getProductById(1L);

        assertNotNull(response);
        assertEquals(product.getTitle(), response.getTitle());
    }

    @Test
    void getProductById_ShouldThrowException_WhenNotExists() {
        when(productRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> productService.getProductById(1L));
    }

    @Test
    void deductStock_ShouldReduceQuantity_WhenSufficientStock() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        productService.deductStock(1L, 5);

        assertEquals(5, product.getStockQuantity());
        verify(productRepository, times(1)).save(product);
    }

    @Test
    void deductStock_ShouldThrowException_WhenInsufficientStock() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        assertThrows(RuntimeException.class, () -> productService.deductStock(1L, 15));
        verify(productRepository, never()).save(any(Product.class));
    }
}
