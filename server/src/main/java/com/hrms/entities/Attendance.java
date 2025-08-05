package com.hrms.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.*;



import jakarta.persistence.Entity;


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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    private LocalTime checkIn;

    private LocalTime checkOut;

    private Integer durationInMinutes;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status;

 
}

