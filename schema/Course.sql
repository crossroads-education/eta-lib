CREATE TABLE IF NOT EXISTS "Course" (
    "id" INT(8) NOT NULL,
    "subject" CHAR(6) NOT NULL,
    "number" CHAR(5) NOT NULL,
    "supported" TINYINT(1) NOT NULL,
    "center" INT(8) NOT NULL,
    "tutor" VARCHAR(63),
    "room" CHAR(1),
    "fee" TINYINT(1) NOT NULL,
PRIMARY KEY("id"));
