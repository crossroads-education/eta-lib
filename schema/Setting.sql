CREATE TABLE IF NOT EXISTS `Setting` (
    `page` INT(8) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(63) NOT NULL,
    `value` TEXT NOT NULL,
    `type` VARCHAR(15) NOT NULL,
PRIMARY KEY(`page`, `name`));
