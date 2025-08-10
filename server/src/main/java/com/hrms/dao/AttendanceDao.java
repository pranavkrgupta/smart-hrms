package com.hrms.dao;

import com.hrms.entities.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceDao extends JpaRepository<Attendance, Long> {
    
    List<Attendance> findByUser_UserId(Long userId);
    
    boolean existsByUser_UserIdAndDate(Long userId, LocalDate date);

    Optional<Attendance> findByUser_UserIdAndDate(Long userId, LocalDate date);

}
