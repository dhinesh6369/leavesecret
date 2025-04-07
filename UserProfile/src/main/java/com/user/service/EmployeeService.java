package com.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.user.model.EmployeeModel;
import com.user.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public ResponseEntity<String> addEmployee(EmployeeModel employee) {
        // Check if the employee with the given email already exists
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            return new ResponseEntity<>("Employee email already exists!", HttpStatus.BAD_REQUEST);
        }
        
        // Check if the employee with the given empId already exists
        if (employeeRepository.existsByEmpId(employee.getEmpId())) {
            return new ResponseEntity<>("Employee ID already exists!", HttpStatus.BAD_REQUEST);
        }
        
        // Save the employee if no conflict
        employeeRepository.save(employee);
        return new ResponseEntity<>("Employee added successfully!", HttpStatus.OK);
    }

    
    public Map<String, Integer> getEmployeeStats() {
        int totalEmployees = (int) employeeRepository.count();
        int totalDepartments = employeeRepository.countDistinctByDept();

        Map<String, Integer> stats = new HashMap<>();
        stats.put("totalEmployees", totalEmployees);
        stats.put("totalDepartments", totalDepartments);
        return stats;
    }
    
    public List<EmployeeModel> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public EmployeeModel getEmployeeByEmpId(String empId) {
        Optional<EmployeeModel> employee = employeeRepository.findByEmpId(empId);
        return employee.orElse(null);
    }

    public Optional<EmployeeModel> getEmployeeByName(String name) {
        return employeeRepository.findByName(name);
    }


    public boolean authenticateEmployee(String name, String password) {
        Optional<EmployeeModel> employee = employeeRepository.findByName(name);
        return employee.isPresent() && employee.get().getPassword().equals(password);
    }

}
