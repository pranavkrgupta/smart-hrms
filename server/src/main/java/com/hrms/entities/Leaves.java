package com.hrms.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Leaves {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(nullable = false)
    private LocalDate fromDate;

    @Column(nullable = false)
    private LocalDate toDate;

    @Column(nullable = false)
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeaveStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeaveType type;

    private String comment;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
