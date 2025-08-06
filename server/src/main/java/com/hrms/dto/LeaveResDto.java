package com.hrms.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeaveResDto {

    private Long id;

    private Long userId;  // ID of the user who requested the leave

    private LocalDate fromDate;

    private LocalDate toDate;

    private String reason;

    private String status;  // e.g. "Pending", "Approved", "Rejected"

    private String type;    // e.g. "Sick", "Casual", "Earned"

    private String comment;
}
