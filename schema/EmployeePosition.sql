CREATE TABLE IF NOT EXISTS `EmployeePosition` (
    `id` CHAR(10) NOT NULL,
    `position` INT(8) NOT NULL,
    `start` DATE NOT NULL,
    `end` DATE,
PRIMARY KEY(`id`, `position`));
