package com.hrms.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SalaryDTO {
	
 	
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.00", inclusive = true, message = "Amount should be non-negative")
    private BigDecimal amount;
    
    @DecimalMin(value = "0.00", inclusive = true, message = "PF Deductions should be non-negative")
    private BigDecimal pfDeduction = BigDecimal.ZERO;
    
    @NotNull(message = "Applicable from date is required")
    private LocalDate applicableFrom;

}
