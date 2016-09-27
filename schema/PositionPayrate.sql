CREATE TABLE IF NOT EXISTS `PositionPayrate` (
    `position` VARCHAR(63) NOT NULL,
    `payrate` DECIMAL(15, 2) NOT NULL,
PRIMARY KEY(`position`));
