package com.hrms.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeaveDto {

    @NotNull(message = "From date is mandatory")
    private LocalDate fromDate;

    @NotNull(message = "To date is mandatory")
    private LocalDate toDate;

    @NotBlank(message = "Reason cannot be blank")
    private String reason;

    @NotNull(message = "Status is mandatory")
    private String status;  // Use string for enum value e.g. "Pending"

    @NotNull(message = "Type is mandatory")
    private String type;    // Use string for enum value e.g. "Sick"

    private String comment;

    // Custom validation to ensure fromDate <= toDate
    @AssertTrue(message = "From date must be before or equal to To date")
    public boolean isFromDateBeforeOrEqualToToDate() {
        if (fromDate == null || toDate == null) {
            return true; // Other annotations will catch nulls
        }
        return !fromDate.isAfter(toDate);
    }
}
