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
    @NotNull(message = "User must not be null")
    private User user;

    @Column(nullable = false)
    @NotNull(message = "From date is required")
    @FutureOrPresent(message = "From date cannot be in the past")
    private LocalDate fromDate;

    @Column(nullable = false)
    @NotNull(message = "To date is required")
    @FutureOrPresent(message = "To date cannot be in the past")
    private LocalDate toDate;

    @Column(nullable = false)
    @NotBlank(message = "Reason cannot be blank")
    @Size(min = 5, max = 255, message = "Reason must be between 5 and 255 characters")
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull(message = "Leave status is required")
    private LeaveStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull(message = "Leave type is required")
    private LeaveType type;

    @Size(max = 500, message = "Comment can be up to 500 characters")
    private String comment;
}
