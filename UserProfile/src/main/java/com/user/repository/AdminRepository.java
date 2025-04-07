package com.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.user.model.AdminModel;

public interface AdminRepository extends JpaRepository<AdminModel, Long> {
    Optional<AdminModel> findByUsername(String username);
}
