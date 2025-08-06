package com.hrms.dto;

import java.time.LocalDate;

import com.hrms.entities.Gender;
import com.hrms.entities.UserRole;

import lombok.Data;

@Data
public class UserRespDto {
	private Long userId;
    private String name;
    private String email;
    private LocalDate dob;
    private Gender gender;
    private String address;
    private String phone;
    private String designationName;
    private String departmentName;
    private UserRole userRole;
}
