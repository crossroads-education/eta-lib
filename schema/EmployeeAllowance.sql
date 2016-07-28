CREATE TABLE IF NOT EXISTS `EmployeeAllowance` (
    `id` CHAR(10) NOT NULL,
    `term` INT(8) NOT NULL,
    `alarm` TINYINT(1) NOT NULL,
    `call1` TINYINT(1) NOT NULL,
    `call2` TINYINT(1) NOT NULL,
    `sick`  TINYINT(1) NOT NULL,
PRIMARY KEY(`id`, `term`));
