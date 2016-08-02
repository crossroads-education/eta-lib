CREATE TABLE IF NOT EXISTS `HoursOfOperation` (
    `term` INT(8) NOT NULL,
    `center` INT(8) NOT NULL,
    `day` INT(8) NOT NULL,
    `open` TIME NOT NULL,
    `close` TIME NOT NULL,
PRIMARY KEY(`term`, `center`, `day`));
