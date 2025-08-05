package com.hrms.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Salaries extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull(message = "User must not be null")
	@ManyToOne
	@JoinColumn(name="user_id",nullable=false)
	private User user;
	
    @NotNull(message = "Amount must not be null")
    @Positive(message = "Amount must be positive")
	@Column(nullable=false)
	private Long amount;
	
	@NotNull(message = "Applicable date must not be null")
	@Column(nullable=false)
	private LocalDate applicableFrom;
	
	@PositiveOrZero(message = "PF deduction must be zero or positive")
	private Long pfDeduction;
	
}
