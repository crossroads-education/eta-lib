CREATE TABLE IF NOT EXISTS `Person` (
    `id` CHAR(10) NOT NULL,
    `username` CHAR(8) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
PRIMARY KEY(`id`));
