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
public class Attendance extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "User is required")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Date is required")
    @Column(nullable = false)
    private LocalDate date;

    private LocalTime checkIn;

    private LocalTime checkOut;

    @Min(value = 0, message = "Duration must be 0 or more minutes")
    private Integer durationInMinutes;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    private AttendanceStatus status;
}
