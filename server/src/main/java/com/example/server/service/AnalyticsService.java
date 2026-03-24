package com.example.server.service;

import com.example.server.model.FoodItem;
import com.example.server.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    public Map<String, Object> getGlobalImpact() {
        List<FoodItem> deliveredItems = foodItemRepository.findByStatus("DELIVERED");
        
        long mealsServed = deliveredItems.stream()
                .filter(i -> i.getEstimatedMeals() != null)
                .mapToLong(FoodItem::getEstimatedMeals)
                .sum();
        
        long foodSavedCount = deliveredItems.size();

        Map<String, Object> stats = new HashMap<>();
        stats.put("mealsServed", mealsServed);
        stats.put("foodSavedCount", foodSavedCount);
        stats.put("totalDonations", foodItemRepository.count());
        
        return stats;
    }
}
