package com.hrms.dao;

import com.hrms.entities.Leaves;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveDao extends JpaRepository<Leaves, Long> {
	List<Leaves> findByUser_UserId(Long userId);

}
