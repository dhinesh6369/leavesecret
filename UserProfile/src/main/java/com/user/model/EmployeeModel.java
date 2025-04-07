package com.user.model;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "employees", uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"empId", "email"})
	})
	public class EmployeeModel {

	    @Id
	    @Column(unique = true, nullable = false)
	    private String empId;

	    @Column(nullable = false)
	    @NotNull(message = "Name cannot be null")
	    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
	    private String name;
	    
	    @Column(nullable = false)
	    @NotNull(message = "Password cannot be null")
	    @Size(min = 6, message = "Password must be at least 6 characters long")
	    private String password;
	    
	    @Column(unique = true, nullable = false)
	    @Email(message = "Email should be valid")
	    private String email;

	    @Column(nullable = false)
	    @NotNull(message = "Department cannot be null")
	    private String dept;

	    @Column(nullable = false)
	    @NotNull(message = "Position cannot be null")
	    private String position;

	    @Column(nullable = false)
	    @NotNull(message = "Joining date cannot be null")
	    private LocalDate joiningDate;


	    public EmployeeModel() {
	        super();
	    }

	    public EmployeeModel(String empId, String email, String name, String dept, String position, LocalDate joiningDate, String password) {
	        this.empId = empId;
	        this.email = email;
	        this.name = name;
	        this.dept = dept;
	        this.position = position;
	        this.joiningDate = joiningDate;
	        this.password = password;
	    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }

    public String getPassword() { 
        return password;
    }

    public void setPassword(String password) { 
        this.password = password;
    }
}
