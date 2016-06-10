CREATE TABLE IF NOT EXISTS `Center` (
    `id` INT(8) NOT NULL AUTO_INCREMENT,
    `code` CHAR(2) NOT NULL,
    `name` VARCHAR(31) NOT NULL,
    `shorthand` VARCHAR(20) NOT NULL,
    `address` TEXT NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `capacity` INT(4) NOT NULL,
PRIMARY KEY(`id`));
