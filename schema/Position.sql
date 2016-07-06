CREATE TABLE IF NOT EXISTS `Position` (
    `id` INT(8) NOT NULL,
    `active` TINYINT(1) NOT NULL,
    `category` VARCHAR(31) NOT NULL,
    `center` INT(8) NOT NULL,
    `name` VARCHAR(63) NOT NULL,
    `open` TINYINT(1) NOT NULL,
    `visible` TINYINT(1) NOT NULL,
PRIMARY KEY(`id`));
