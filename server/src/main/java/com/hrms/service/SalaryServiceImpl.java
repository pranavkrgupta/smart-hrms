package com.hrms.service;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.hrms.custom_exceptions.ResourceNotFoundException;
import com.hrms.dao.SalaryDao;
import com.hrms.dao.UserDao;
import com.hrms.dto.SalaryReqDto;
import com.hrms.dto.SalaryResDTO;
import com.hrms.entities.Salaries;
import com.hrms.entities.UserEntity;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class SalaryServiceImpl implements SalaryService {

	// Dependency
	private final SalaryDao salaryDao;
	private final UserDao userDao;
	private final ModelMapper modelMapper;

	@Override
	public List<SalaryResDTO> getSalaryByUser(Long LoggedInuserId) {
		List<Salaries> salaries = salaryDao.findAllByUser_UserId(LoggedInuserId);
		return salaries.stream().map(this::mapToResDto).collect(Collectors.toList());
	}

	@Override
	public SalaryResDTO createSalary(SalaryReqDto salaryReqDto) {
		UserEntity user = userDao.findById(salaryReqDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

        Salaries salary = new Salaries();
        salary.setUser(user);
        salary.setAmount(salaryReqDto.getAmount());
        salary.setApplicableFrom(salaryReqDto.getApplicableFrom());
        salary.setPfDeduction(salaryReqDto.getPfDeduction() != null ? salaryReqDto.getPfDeduction() : BigDecimal.ZERO);

        Salaries saved = salaryDao.save(salary);
        return mapToResDto(saved);
	}

	@Override
	public List<SalaryResDTO> getAllSalaries() {
		return salaryDao.findAll().stream()
                .map(this::mapToResDto)
                .collect(Collectors.toList());
	}

	@Override
	public SalaryResDTO updateSalary(Long salaryId, SalaryReqDto salaryReqDto) {
		Salaries salary = salaryDao.findById(salaryId).orElseThrow(() -> new ResourceNotFoundException("Salary Not Found"));

        UserEntity user = userDao.findById(salaryReqDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

        salary.setUser(user);
        salary.setAmount(salaryReqDto.getAmount());
        salary.setApplicableFrom(salaryReqDto.getApplicableFrom());
        salary.setPfDeduction(salaryReqDto.getPfDeduction() != null ? salaryReqDto.getPfDeduction() : BigDecimal.ZERO);

        Salaries updated = salaryDao.save(salary);
        return mapToResDto(updated);
	}


	private SalaryResDTO mapToResDto(Salaries salary) {
		return SalaryResDTO.builder().id(salary.getId()).userId(salary.getUser().getUserId())
				.userName(salary.getUser().getName()) // assuming UserEntity has getName()
				.amount(salary.getAmount()).applicableFrom(salary.getApplicableFrom())
				.pfDeduction(salary.getPfDeduction()).build();
	}

}
