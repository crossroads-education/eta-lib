CREATE TABLE IF NOT EXISTS `StudentSection` (
    --student ID
    `student` CHAR(10) NOT NULL,
    --section ID
    `section` INT(8) NOT NULL,
    --drop date
    `dropDate` DATE,
PRIMARY KEY(`student`, `section`));
