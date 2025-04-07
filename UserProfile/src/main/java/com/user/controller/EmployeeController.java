package com.user.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.user.model.EmployeeModel;
//import com.user.service.EmailService;
import com.user.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
//@CrossOrigin("http://localhost:3000")
@CrossOrigin(origins = "http://15.168.114.125:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    
//    @Autowired
//    private EmailService emailService;


    @PostMapping("/add")
    public ResponseEntity<String> addEmployee(@RequestBody EmployeeModel employee) {
    	return employeeService.addEmployee(employee);      
    }
    
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> credentials) {
        String name = credentials.get("name");
        String password = credentials.get("password");
        if (name == null || password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name and password are required!");
        }

        boolean isAuthenticated = employeeService.authenticateEmployee(name, password);

        if (isAuthenticated) {
            Optional<EmployeeModel> employee = employeeService.getEmployeeByName(name);
            if (employee != null) {
                return ResponseEntity.ok(employee); 
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee details not found!");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password!");
        }
    }


    @GetMapping("/employee-details")
    public ResponseEntity<List<EmployeeModel>> getEmployeeDetails() {
        List<EmployeeModel> employees = employeeService.getAllEmployees();
        
        if (employees.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(employees);
        }

        return ResponseEntity.ok(employees);
    }
    
    @GetMapping("/employee-details/{empId}")
    public ResponseEntity<?> getUserDetailsByEmpId(@PathVariable("empId") String empId) {
        EmployeeModel employee = employeeService.getEmployeeByEmpId(empId);  // Call the service layer

        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Integer>> getEmployeeStats() {
        return ResponseEntity.ok(employeeService.getEmployeeStats());
    }
    
//    @PostMapping("/leave/request")
//    public String requestLeave(@RequestParam String employeeEmail, @RequestParam String adminEmail) {
//        // Logic to save leave request in database...
//
//        String subject = "New Leave Request Submitted";
//        String body = "An employee (" + employeeEmail + ") has submitted a leave request. Please review it.";
//
//        emailService.sendEmail(adminEmail, subject, body);
//        return "Leave request submitted and admin notified!";
//    }
    
}