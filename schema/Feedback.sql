CREATE TABLE IF NOT EXISTS `Feedback` (
    `id` INT(8) NOT NULL AUTO_INCREMENT,
    `user` CHAR(32) NOT NULL,
    `submitted` TIMESTAMP NOT NULL,
    `subject` VARCHAR(32) NOT NULL,
    `body` TEXT NOT NULL,
PRIMARY KEY(`id`));
