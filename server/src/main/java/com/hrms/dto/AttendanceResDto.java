package com.hrms.dto;

import com.hrms.entities.AttendanceStatus;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceResDto {
    
    private Long id;
    private Long userId;       // user id for reference if needed
    private String UserName;
    private LocalDate date;
    private String checkIn;
    private String checkOut;
    private Integer durationInMinutes;
    private AttendanceStatus status;
}
