CREATE TABLE IF NOT EXISTS `Visit` (
    `student` CHAR(32) NOT NULL,
    `location` CHAR(2) NOT NULL,
    `timeIn` DATETIME NOT NULL,
    `timeOut` DATETIME,
    `section` INT(8) NOT NULL,
    `term` CHAR(4) NOT NULL,
    `session` CHAR(4) NOT NULL,
PRIMARY KEY(`student`, `timeIn`, `term`));
