CREATE TABLE IF NOT EXISTS `Section` (
    `id` INT(8) NOT NULL AUTO_INCREMENT,
    `active` TINYINT(1) NOT NULL,
    `course` INT(8) NOT NULL,
    `creditHours` INT(4) NOT NULL,
    `maximumEnrolled` INT(4) NOT NULL,
    `meetingType` CHAR(3) NOT NULL,
    `number` INT(8) NOT NULL,
    `room` VARCHAR(10),
    `term` INT(8) NOT NULL,
    `totalEnrolled` INT(4) NOT NULL,
    `professor` CHAR(10),
    `start` TIME NOT NULL,
    `end` TIME NOT NULL,
    `days` VARCHAR(7) NOT NULL,
UNIQUE KEY(`number`, `term`),
PRIMARY KEY(`id`));
