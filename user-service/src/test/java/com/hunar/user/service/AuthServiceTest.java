package com.hunar.user.service;

import com.hunar.user.dto.UserRequest;
import com.hunar.user.model.Role;
import com.hunar.user.model.User;
import com.hunar.user.repository.UserRepository;
import com.hunar.user.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private UserRequest userRequest;

    @BeforeEach
    void setUp() {
        userRequest = UserRequest.builder()
                .email("test@example.com")
                .password("password")
                .name("Test User")
                .role(Role.CUSTOMER)
                .build();
    }

    @Test
    void saveUser_ShouldSaveEncodedUser() {
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        
        String result = authService.saveUser(userRequest);
        
        assertEquals("user added to the system", result);
        verify(repository, times(1)).save(any(User.class));
    }

    @Test
    void generateToken_ShouldReturnToken() {
        when(jwtUtil.generateToken("test@example.com")).thenReturn("mockToken");
        
        String token = authService.generateToken("test@example.com");
        
        assertEquals("mockToken", token);
    }
}
