CREATE TABLE IF NOT EXISTS `HistoryParameter` (
    `id` INT(8) NOT NULL,
    `name` VARCHAR(31) NOT NULL,
    `value` TEXT NOT NULL,
PRIMARY KEY(`id`, `name`));
