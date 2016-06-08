CREATE TABLE IF NOT EXISTS `Term` (
    `id` CHAR(4) NOT NULL,
    `session` CHAR(3) NOT NULL,
    `start` DATE NOT NULL,
    `end` DATE NOT NULL,
    `name` VARCHAR(31) NOT NULL,
PRIMARY KEY(`id`, `session`));
