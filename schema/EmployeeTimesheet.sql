CREATE TABLE IF NOT EXISTS `EmployeeTimesheet` (
    `id` CHAR(32) NOT NULL,
    `ipIn` VARCHAR(45) NOT NULL,
    `ipOut` VARCHAR(45),
    `timeIn` DATETIME NOT NULL,
    `timeOut` DATETIME,
    `center` INT(8) NOT NULL,
PRIMARY KEY(`id`, `timeIn`));
