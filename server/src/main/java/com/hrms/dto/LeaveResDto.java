package com.hrms.dto;

import lombok.*;
import java.time.LocalDate;

import com.hrms.entities.LeaveStatus;
import com.hrms.entities.LeaveType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveResDto {

    private Long id;
    private Long userId;  
    private String userName;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String reason;
    private LeaveStatus status;  // e.g. "Pending", "Approved", "Rejected"
    private LeaveType type;    // e.g. "Sick", "Casual", "Earned"
    private String comment;
}
