package com.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.user.model.EmployeeModel;


@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, String> {
    boolean existsByEmail(String email); 
    boolean existsByEmpId(String empId);
    @Query("SELECT COUNT(DISTINCT e.dept) FROM EmployeeModel e")
    int countDistinctByDept();
	Optional<EmployeeModel> findByName(String name);
	Optional<EmployeeModel> findByEmpId(String empId);
}
