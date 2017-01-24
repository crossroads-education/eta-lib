CREATE TABLE IF NOT EXISTS `OnlineRoom` (
    `letter` CHAR(1) NOT NULL,
    `date` DATE NOT NULL,
    `url` VARCHAR(255) NOT NULL,
PRIMARY KEY(`letter`, `date`));
