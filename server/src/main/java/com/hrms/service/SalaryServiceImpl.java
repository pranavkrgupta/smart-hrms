package com.hrms.service;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.hrms.dao.SalaryDao;
import com.hrms.dao.UserDao;
import com.hrms.dto.SalaryDTO;
import com.hrms.dto.SalaryRespDTO;
import com.hrms.entities.Salaries;
import com.hrms.entities.UserEntity;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class SalaryServiceImpl implements SalaryService{

	// Dependency
	private final SalaryDao salaryDao;
	private final UserDao userDao;
	private final ModelMapper modelMapper;
	
	@Override
	public List<SalaryRespDTO> getAllSalaries() {
		// TODO Auto-generated method stub
		List<Salaries> salaries = salaryDao.findAll();
		List<SalaryRespDTO>dtoList = new ArrayList<>();
		for(Salaries s : salaries)
		{
			SalaryRespDTO respDTO = modelMapper.map(s,SalaryRespDTO.class);
		    // Set the userName field
			respDTO.setUserName(s.getUser().getName());
			dtoList.add(respDTO);
		}
		return dtoList;
	}


	@Override
	public String deleteSalary(Integer SalaryId) {
		Salaries salary = salaryDao.findById(SalaryId)
				.orElseThrow(() -> new RuntimeException("salary not found"));
		salaryDao.delete(salary);
		return "salary Deleted Successfully";
	}


	@Override
	public String addNewSalary(Long UserId, SalaryDTO dto) {
		
		// It is used to fetch the user entity from the db based on user id present in salary dto
		UserEntity user = userDao.findById(UserId)
				.orElseThrow(()-> new RuntimeException("User not found"));

		Salaries salary = modelMapper.map(dto,Salaries.class);
		salary.setUser(user);
		salaryDao.save(salary);
		

		return "Salary details added successfully with id = "+ salary.getId();
	}

	@Override
	public String updateSalary(Integer SalaryId, SalaryDTO dto) {
		// 1st Fetch the existing salary record through id
		Salaries existingSalary = salaryDao.findById(SalaryId)
				.orElseThrow(()->new RuntimeException("Salary not found for that id"+SalaryId));
		
		// Update the fields
		existingSalary.setAmount(dto.getAmount());
		existingSalary.setApplicableFrom(dto.getApplicableFrom());
		existingSalary.setPfDeduction(dto.getPfDeduction());
		
		// save the updated record
		salaryDao.save(existingSalary);
		return "Salary Record Updated successfully";
	}

	@Override
	public SalaryRespDTO getSalaryByUserId(Long userId) {
		Salaries salary = salaryDao.findByUser_UserId(userId)
				.orElseThrow(()-> new RuntimeException("Salary Not found"));		
		// Map Salary Entity to salaryRespDTO
		SalaryRespDTO respDTO = modelMapper.map(salary, SalaryRespDTO.class);
		
		// set the userName field
		respDTO.setUserName(salary.getUser().getName());
		
		return respDTO;
	}


	

}
