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
@Table(name = "Attendance", uniqueConstraints = { @UniqueConstraint(columnNames = { "user_id", "date" }) })
@ToString
@Builder
public class Attendance extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "User is required")
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity user;

	@NotNull(message = "Date is mandatory")
	@Column(name = "date", nullable = false)
	private LocalDate date;

	@Column(name = "check_in")
	private LocalTime checkIn;

	@Column(name = "check_out")
	private LocalTime checkOut;

	@Min(value = 0, message = "Duration must be non-negative")
	@Column(name = "duration_in_minutes")
	private Integer durationInMinutes;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", columnDefinition = "ENUM('PENDING', 'ACCEPTED', 'HALF_DAY', 'REJECTED')")
	private AttendanceStatus status;

	private static final int FULL_DAY_DURATION = 480; // 8 hours
	private static final int HALF_DAY_DURATION = 240; // 4 hours

	@PrePersist
	@PreUpdate
	private void calculateDurationAndUpdateStatus() {
	    if (checkIn != null && checkOut != null) {
	        long minutes = Duration.between(checkIn, checkOut).toMinutes();
	        if (minutes < 0) {
	          // Handle overnight shifts or invalid time, e.g. treat as zero or throw error
	          minutes = 0;
	        }
	        durationInMinutes = (int) minutes;

	        if (durationInMinutes >= FULL_DAY_DURATION) {
	          status = AttendanceStatus.ACCEPTED;
	        } else if (durationInMinutes >= HALF_DAY_DURATION) {
	          status = AttendanceStatus.HALF_DAY;
	        } else {
	          status = AttendanceStatus.REJECTED;
	        }
	    } else {
	        durationInMinutes = 0;
	        status = AttendanceStatus.PENDING;
	    }
	}

}
