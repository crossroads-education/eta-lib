CREATE TABLE IF NOT EXISTS `EmployeeSchedule` (
    `id` CHAR(10) NOT NULL,
    `center` INT(8) NOT NULL,
    `time` TIME NOT NULL,
    `day` TINYINT(1) NOT NULL,
    `term` INT(8) NOT NULL,
    `isAvailable` TINYINT(1) NOT NULL DEFAULT 0,
PRIMARY KEY(`id`, `time`, `day`, `term`));
