CREATE TABLE IF NOT EXISTS `HoursOfOperation` (
    `id` INT(8) NOT NULL AUTO_INCREMENT,
    `term` INT(8) NOT NULL,
    `center` INT(8) NOT NULL,
    `day` TINYINT(1) NOT NULL,
    `open` TIME NOT NULL,
    `close` TIME NOT NULL,
PRIMARY KEY(`id`));
