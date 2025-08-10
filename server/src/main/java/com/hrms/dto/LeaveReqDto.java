package com.hrms.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

import com.hrms.entities.LeaveType;
import com.hrms.entities.UserEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveReqDto {

    @NotNull(message = "From date is mandatory")
    private LocalDate fromDate;

    @NotNull(message = "To date is mandatory")
    private LocalDate toDate;

    @NotBlank(message = "Reason cannot be blank")
    private String reason;

    @NotNull(message = "Leave type is mandatory")
    private LeaveType type;
    
    // Custom validation to ensure fromDate <= toDate
    @AssertTrue(message = "From date must be before or equal to To date")
    public boolean isFromDateBeforeOrEqualToToDate() {
        if (fromDate == null || toDate == null) {
            return true; // Other annotations will catch nulls
        }
        return !fromDate.isAfter(toDate);
    }
}
