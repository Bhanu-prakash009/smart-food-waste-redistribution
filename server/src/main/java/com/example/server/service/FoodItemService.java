package com.example.server.service;

import com.example.server.model.FoodItem;
import com.example.server.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {
    @Autowired
    private FoodItemRepository foodItemRepository;

    public FoodItem addFoodItem(FoodItem foodItem) {
        foodItem.setStatus("AVAILABLE");
        return foodItemRepository.save(foodItem);
    }

    public List<FoodItem> getAvailableFood() {
        return foodItemRepository.findByStatus("AVAILABLE");
    }

    public FoodItem updateFoodStatus(Long id, String status) {
        FoodItem item = foodItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Food item not found"));
        item.setStatus(status);
        return foodItemRepository.save(item);
    }
    
    public FoodItem getById(Long id) {
        return foodItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Food item not found"));
    }
}
