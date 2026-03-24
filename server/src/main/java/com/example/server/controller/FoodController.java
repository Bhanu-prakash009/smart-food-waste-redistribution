package com.example.server.controller;

import com.example.server.model.FoodItem;
import com.example.server.model.User;
import com.example.server.service.FoodItemService;
import com.example.server.service.MatchingService;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodItemService foodItemService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private MatchingService matchingService;

    @GetMapping("/nearby")
    public ResponseEntity<List<FoodItem>> getNearbyFood(@RequestParam Long userId, @RequestParam double radius) {
        User user = userService.findById(userId).orElseThrow();
        List<FoodItem> available = foodItemService.getAvailableFood();
        return ResponseEntity.ok(matchingService.findNearbyFood(user, available, radius));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addFoodItem(@RequestBody FoodItem foodItem, @RequestParam Long donorId) {
        try {
            User donor = userService.findById(donorId).orElseThrow();
            foodItem.setDonor(donor);
            // Auto-calculate estimated meals if not provided
            if (foodItem.getEstimatedMeals() == null) {
                foodItem.setEstimatedMeals(10); // Default placeholder logic
            }
            FoodItem saved = foodItemService.addFoodItem(foodItem);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace(); // Log the full stack trace for debugging
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
