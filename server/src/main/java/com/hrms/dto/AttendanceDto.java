package com.hrms.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDto {
    
    //private Long id; // optional, useful for update
    
    @NotNull(message = "Date is required")
    private LocalDate date;
    
    // Optional times in String format "HH:mm", validated with regex
    @Pattern(regexp = "^$|([01]?\\d|2[0-3]):[0-5]\\d$", message = "Check-in must be in HH:mm format or empty")
    private String checkIn;
    
    @Pattern(regexp = "^$|([01]?\\d|2[0-3]):[0-5]\\d$", message = "Check-out must be in HH:mm format or empty")
    private String checkOut;
}
