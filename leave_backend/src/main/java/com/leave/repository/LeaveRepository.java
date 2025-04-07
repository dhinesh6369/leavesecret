package com.leave.repository;

import com.leave.model.LeaveModel;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaveRepository extends JpaRepository<LeaveModel, Long> {
	long count(); // Total Leave Requests
    long countByStatus(String status);
    List<LeaveModel> findByEmpId(String empId);
}
