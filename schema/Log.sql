CREATE TABLE IF NOT EXISTS `Log` (
    `author` CHAR(10) NOT NULL,
    `about` CHAR(10),
    `timestamp` TIMESTAMP NOT NULL,
    `message` TEXT NOT NULL,
    -- "MANGR" | "FRONT" | "CLOCK"
    `type` CHAR(5) NOT NULL,
PRIMARY KEY(`author`, `timestamp`));
