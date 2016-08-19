CREATE TABLE IF NOT EXISTS `ApplicantEvaluation` (
    `id` CHAR(10) NOT NULL,
    `date` DATE NOT NULL,
    `level` VARCHAR(63) NOT NULL,
    `score` INT(8) NOT NULL,
PRIMARY KEY(`id`, `date`, `level`));
