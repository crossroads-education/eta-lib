CREATE TABLE IF NOT EXISTS `Athlete` (
    `id` CHAR(10) NOT NULL,
    `code` CHAR(4) NOT NULL,
    `start` DATE NOT NULL,
    `end` DATE,
PRIMARY KEY(`id`));
