CREATE TABLE IF NOT EXISTS `ProfessorSection` (
    --professor ID
    `professor` CHAR(10) NOT NULL,
    --section ID
    `section` INT(8) NOT NULL,
PRIMARY KEY(`professor`, `section`));
