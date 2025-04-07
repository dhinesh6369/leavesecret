package com.leave.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
public class EmployeeModel {

    @Id
    @Column(unique = true, nullable = false)
    private String empId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String dept;

    @Column(nullable = false)
    private String position;

    @Column(nullable = false)
    private LocalDate joiningDate;

    @Column(nullable = false)
    private String password; 

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

    public String getPassword() { // ✅ Getter for Password
        return password;
    }

    public void setPassword(String password) { // ✅ Setter for Password
        this.password = password;
    }
}
