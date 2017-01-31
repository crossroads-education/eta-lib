CREATE TABLE IF NOT EXISTS `Policy` (
    `category` VARCHAR(16) NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `body` TEXT NOT NULL,
    `lastUpdated` DATETIME NOT NULL,
PRIMARY KEY(`category`, `name`));
