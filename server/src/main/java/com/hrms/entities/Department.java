package com.hrms.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
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
@Entity
@ToString
public class Department extends BaseEntity{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long departmentId;

	@NotBlank(message = "Department name is mandatory")
	@Size(max = 100, message = "Department name must be at most 100 characters")
	@Column(name = "name", nullable = false, unique = true)
    private String name;

	@Size(max = 500, message = "Description must be at most 500 characters")
	@Column(name = "description", columnDefinition = "TEXT")
    private String description;
}
