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
public class Attendance extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "User is required")
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

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
	@Column(name = "status", columnDefinition = "ENUM('Pending', 'Accepted', 'Rejected')")
	private AttendanceStatus status;

	private static final int FULL_DAY_DURATION = 480; // 8 hours
	private static final int HALF_DAY_DURATION = 240; // 4 hours

	@PrePersist
	@PreUpdate
	private void calculateDurationAndUpdateStatus() {
		if (checkIn != null && checkOut != null) {
			long minutes = Duration.between(checkIn, checkOut).toMinutes();
			durationInMinutes = (int) Math.max(minutes, 0);

			if (durationInMinutes >= FULL_DAY_DURATION) {
				status = AttendanceStatus.ACCEPTED; // Full day
			} else if (durationInMinutes >= HALF_DAY_DURATION) {
				status = AttendanceStatus.HALF_DAY; // Half day
			} else {
				status = AttendanceStatus.REJECTED;
			}
		} else {
			durationInMinutes = null;
			status = AttendanceStatus.PENDING;
		}
	}
}
