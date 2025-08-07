package com.hrms.dto;

import com.hrms.entities.LeaveStatus;
import com.hrms.entities.LeaveType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class LeaveResDto {
    private Long id;
    private Long userId;
    private String userName;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String reason;
    private LeaveStatus status;
    private LeaveType type;
    private String comment;
}
