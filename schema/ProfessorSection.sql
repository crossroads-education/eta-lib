CREATE TABLE IF NOT EXISTS `ProfessorSection` (
    `professor` CHAR(10) NOT NULL,
    `section` INT(8) NOT NULL,
PRIMARY KEY(`professor`, `section`));
