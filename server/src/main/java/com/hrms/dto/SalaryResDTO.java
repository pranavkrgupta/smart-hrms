package com.hrms.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalaryResDTO {
	private Long id;
    private Long userId;
    private String userName;
    private BigDecimal amount;
    private LocalDate applicableFrom;
    private BigDecimal pfDeduction;
}
