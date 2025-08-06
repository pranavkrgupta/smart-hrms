package com.hrms.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity

/*
 * we are using a surrogate key (designation_id) for simplicity, that does not
 * mean multiple rows with the same designation_name AND department_name can be
 * allowed to exist simultaneously. Ideally, this would be the composite PK
 * enforcing uniqueness implicitly. When using surrogates, this needs to be done
 * manually.
 */

@Table(name = "designations", uniqueConstraints = { @UniqueConstraint(columnNames = { "name", "department_id" }) })
public class Designation extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long designationId;

	@Column(name = "name", nullable = false, length = 100)
	private String name;

	/*
	 * Foreign Key + NOT NULL enforces complete participation when relation is
	 * implicit. FK by itself won't enforce complete participation as it can contain
	 * NULL values.
	 */

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "department_id", nullable = false)
	private Department department;

	private String description;

}
