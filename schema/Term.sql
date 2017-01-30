CREATE TABLE IF NOT EXISTS "Term" (
    "id" INT(8) NOT NULL AUTO_INCREMENT,
    "term" CHAR(4) NOT NULL,
    "session" CHAR(3) NOT NULL,
    "start" DATE NOT NULL,
    "end" DATE NOT NULL,
    "name" VARCHAR(31) NOT NULL,
UNIQUE KEY("term", "session"),
PRIMARY KEY("id"));
