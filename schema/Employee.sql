CREATE TABLE IF NOT EXISTS `Employee` (
    `id` CHAR(10) NOT NULL,
    `altEmail` VARCHAR(63),
    `badgeName` VARCHAR(63),
    `biography` TEXT,
    `current` TINYINT(1) NOT NULL,
    `emergencyName` VARCHAR(63),
    `emergencyPhone` VARCHAR(15),
    `emergencyRelationship` VARCHAR(31),
    `international` TINYINT(1) NOT NULL,
    `maxHours` INT(4) NOT NULL,
    `minHours` INT(4) NOT NULL,
    `notes` TEXT,
    `phone` VARCHAR(15),
    `shirt` VARCHAR(4) NOT NULL,
    `hoodie` VARCHAR(4) NOT NULL,
    `mentor` TINYINT(1) NOT NULL, -- mentor semester progression: -1 if not mentor
PRIMARY KEY(`id`));
