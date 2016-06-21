CREATE TABLE IF NOT EXISTS `StudentSection` (
    `student` CHAR(10) NOT NULL,
    `section` INT(8) NOT NULL,
    `dropDate` DATE,
PRIMARY KEY(`student`, `section`));
