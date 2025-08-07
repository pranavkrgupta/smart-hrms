package com.hrms.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeaveDto {

//    @NotNull(message = "User ID is required")
//    private Long userId;

    @NotNull(message = "From date is required")
    private LocalDate fromDate;

    @NotNull(message = "To date is required")
    private LocalDate toDate;

    @NotBlank(message = "Reason is required")
    private String reason;

    @NotNull(message = "Leave status is required")
    private String status;

    @NotNull(message = "Leave type is required")
    private String type;

    private String comment;

    @AssertTrue(message = "From date must be before or equal to To date")
    public boolean isFromDateBeforeOrEqualToToDate() {
        if (fromDate == null || toDate == null) {
            return true;
        }
        return !fromDate.isAfter(toDate);
    }
}
