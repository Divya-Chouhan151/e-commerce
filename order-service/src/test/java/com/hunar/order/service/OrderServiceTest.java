package com.hunar.order.service;

import com.hunar.order.client.ProductClient;
import com.hunar.order.dto.OrderItemRequest;
import com.hunar.order.dto.OrderRequest;
import com.hunar.order.dto.ProductResponse;
import com.hunar.order.model.Order;
import com.hunar.order.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private ProductClient productClient;

    @InjectMocks
    private OrderService orderService;

    private OrderRequest orderRequest;
    private ProductResponse productResponse;

    @BeforeEach
    void setUp() {
        OrderItemRequest itemRequest = OrderItemRequest.builder()
                .productId(1L)
                .quantity(2)
                .build();

        orderRequest = OrderRequest.builder()
                .userId(1L)
                .orderItems(List.of(itemRequest))
                .build();

        productResponse = ProductResponse.builder()
                .id(1L)
                .title("Sweater")
                .price(BigDecimal.valueOf(50.0))
                .stockQuantity(10)
                .build();
    }

    @Test
    void placeOrder_ShouldSaveOrder_WhenStockIsSufficient() {
        when(productClient.getProductById(1L)).thenReturn(productResponse);

        String result = orderService.placeOrder(orderRequest);

        assertEquals("Order placed successfully", result);
        verify(productClient, times(1)).deductStock(1L, 2);
        verify(orderRepository, times(1)).save(any(Order.class));
    }
}
