-- DEPARTMENT TABLE
CREATE TABLE Department (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- DESIGNATIONS TABLE
CREATE TABLE Designations (
    designation_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES Department(department_id), 
    UNIQUE (name, department_id)
);

-- USERS TABLE
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATE,
    gender ENUM('Male', 'Female', 'Other'),
    address TEXT,
    phone VARCHAR(20),
    designation_id INT NOT NULL,
    user_role ENUM('ADMIN', 'EMPLOYEE') NOT NULL COMMENT 'User role: ADMIN or EMPLOYEE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (designation_id) REFERENCES Designations(designation_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Add index to speed up joins
CREATE INDEX idx_designation_id ON Users(designation_id);
CREATE INDEX idx_user_role ON Users(user_role);

-- ATTENDANCE TABLE
CREATE TABLE Attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    duration_in_minutes INT,
    status ENUM('Pending', 'Accepted', 'Rejected'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    UNIQUE (user_id, date) -- Ensures one attendance record per user per day
);

CREATE INDEX idx_user_attendance ON Attendance(user_id);

-- SALARIES TABLE
CREATE TABLE Salaries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    applicable_from DATE NOT NULL,
    pf_deductions DECIMAL(10,2) DEFAULT 0.00 CHECK (pf_deductions >= 0),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    UNIQUE(user_id, applicable_from) -- Ensures one salary record per user per applicable date
);

CREATE INDEX idx_user_salaries ON Salaries(user_id);

-- LEAVES TABLE
CREATE TABLE Leaves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('Pending', 'Approved', 'Rejected') NOT NULL,
    type ENUM('Sick', 'Casual', 'Earned') NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CHECK (from_date <= to_date)
);

CREATE INDEX idx_user_leaves ON Leaves(user_id);

-- Optional: Add a trigger to automatically update the updated_at field in the Users table
CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON Users
FOR EACH ROW
SET NEW.updated_at = CURRENT_TIMESTAMP;


-- Optional AuditLogs table to track admin/HR actions (optional but recommended)
CREATE TABLE AuditLogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,                                -- whose record is affected
    action_type VARCHAR(50),                    -- e.g., 'Leave Approved', 'Salary Updated'
    description TEXT,
    performed_by INT,                           -- admin/HR user_id
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (performed_by) REFERENCES Users(user_id)
);

-- Optional Salary History table to track all changes
CREATE TABLE SalaryHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    pf_deductions DECIMAL(10,2) DEFAULT 0.00 CHECK (pf_deductions >= 0),
    applicable_from DATE NOT NULL,
    applicable_to DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);