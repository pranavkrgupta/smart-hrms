package com.hrms.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.hrms.entities.Gender;
import com.hrms.entities.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserReqDto {
	@Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    @Size(max = 255, message = "Email must be at most 255 characters")
    private String email;
    
    @NotBlank(message = "Name is mandatory")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dob;

    private Gender gender;

    private String address;
    
    @Pattern(regexp = "^\\+?[0-9]{10,20}$", message = "Phone number must be valid and 10-20 digits")
    private String phone;

    @NotNull(message = "Designation ID is required")
    private long designationId;
}
