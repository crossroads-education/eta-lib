CREATE TABLE IF NOT EXISTS `Course` (
    `id` INT(8) NOT NULL AUTO_INCREMENT,
    `subject` CHAR(6) NOT NULL,
    `number` CHAR(5) NOT NULL,
    `supported` TINYINT(1) NOT NULL,
    `location` CHAR(2) NOT NULL,
    `tutor` VARCHAR(63) NOT NULL,
    `room` CHAR(4) NOT NULL,
PRIMARY KEY(`id`));
