package com.hrms.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class Leaves extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "User is mandatory")
    private User user;

    @NotNull(message = "From date is mandatory")
    @Column(name = "from_date", nullable = false)
    private LocalDate fromDate;

    @NotNull(message = "To date is mandatory")
    @Column(name = "to_date", nullable = false)
    private LocalDate toDate;

    @NotBlank(message = "Reason cannot be blank")
    @Column(name = "reason", columnDefinition = "TEXT", nullable = false)
    private String reason;

    @NotNull(message = "Status is mandatory")
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('Pending', 'Approved', 'Rejected')")
    private LeaveStatus status;

    @NotNull(message = "Type is mandatory")
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, columnDefinition = "ENUM('Sick', 'Casual', 'Earned')")
    private LeaveType type;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;
    
    // Custom validation method to ensure fromDate <= toDate
    @AssertTrue(message = "From date must be before or equal to To date")
    public boolean isFromDateBeforeOrEqualToToDate() {
        if (fromDate == null || toDate == null) {
            return true; // Not responsibility of this check
        }
        return !fromDate.isAfter(toDate);
    }
}
