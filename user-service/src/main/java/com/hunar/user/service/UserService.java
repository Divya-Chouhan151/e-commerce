package com.hunar.user.service;

import com.hunar.user.model.User;
import com.hunar.user.model.Wishlist;
import com.hunar.user.repository.UserRepository;
import com.hunar.user.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final WishlistRepository wishlistRepository;

    public void addToWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Wishlist wishlist = Wishlist.builder()
                .user(user)
                .productId(productId)
                .build();
        
        wishlistRepository.save(wishlist);
    }

    public List<Wishlist> getWishlist(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }
}
