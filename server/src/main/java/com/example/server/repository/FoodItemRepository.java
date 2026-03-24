package com.example.server.repository;

import com.example.server.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByStatus(String status);
    List<FoodItem> findByDonorId(Long donorId);
}
