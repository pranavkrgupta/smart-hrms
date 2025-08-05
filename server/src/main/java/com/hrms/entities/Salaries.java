package com.hrms.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Salaries", uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"user_id", "applicable_from"})
	})
public class Salaries extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull(message = "User is mandatory")
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="user_id",nullable=false)
	private User user;
	
	@NotNull(message = "Amount is mandatory")
	@DecimalMin(value = "0.00", inclusive = true, message = "Amount must be non-negative")
	@Digits(integer = 8, fraction = 2, message = "Amount must be a valid monetary value")
	@Column(nullable = false, precision = 10, scale = 2)
	private BigDecimal amount;
	
	@NotNull(message = "Applicable from date is mandatory")
	@Column(name="applicable_from",nullable=false)
	private LocalDate applicableFrom;
	
	@DecimalMin(value = "0.00", inclusive = true, message = "PF Deductions must be non-negative")
	@Digits(integer = 8, fraction = 2, message = "PF Deductions must be a valid monetary value")
	@Column(name = "pf_deductions", precision = 10, scale = 2)
	private BigDecimal pfDeduction=BigDecimal.ZERO;
	
}
