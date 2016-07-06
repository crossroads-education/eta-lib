CREATE TABLE IF NOT EXISTS `History` (
    `id` INT(8) NOT NULL AUTO_INCREMENT,
    `user` INT(8) NOT NULL,
    `timestamp` TIMESTAMP NOT NULL,
    `cols` TEXT NOT NULL,
    `params` TEXT NOT NULL,
    `table` TEXT NOT NULL,
    `raw` TINYINT(1) NOT NULL,
PRIMARY KEY(`id`));
