package com.hrms.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SalaryRespDTO {
	
	private Long id;
    private BigDecimal amount;   
    private BigDecimal pfDeduction = BigDecimal.ZERO;
    private LocalDate applicableFrom;
    private String UserName;

}
