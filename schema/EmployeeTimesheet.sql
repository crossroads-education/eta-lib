CREATE TABLE IF NOT EXISTS `EmployeeTimesheet` (
    `id` CHAR(10) NOT NULL,
    `ipIn` VARCHAR(45) NOT NULL,
    `ipOut` VARCHAR(45),
    `timeIn` DATETIME NOT NULL,
    `timeOut` DATETIME,
PRIMARY KEY(`id`, `timeIn`));
