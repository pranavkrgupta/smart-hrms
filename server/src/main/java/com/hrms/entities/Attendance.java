package com.hrms.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.*;



import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(nullable = false)
    private LocalDate date;

    private LocalTime checkIn;

    private LocalTime checkOut;

    private Integer durationInMinutes;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

