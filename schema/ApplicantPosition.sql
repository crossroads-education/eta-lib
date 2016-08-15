CREATE TABLE IF NOT EXISTS `ApplicantPosition` (
    `id` CHAR(10) NOT NULL,
    `position` VARCHAR(63) NOT NULL,
    `lastApplied` TIMESTAMP NOT NULL,
    `count` INT(8) NOT NULL,
PRIMARY KEY(`id`, `position`));
