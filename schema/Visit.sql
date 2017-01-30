CREATE TABLE IF NOT EXISTS "Visit" (
    "student" CHAR(10) NOT NULL,
    "center" INT(8) NOT NULL,
    "timeIn" DATETIME NOT NULL,
    "timeOut" DATETIME,
    "section" TEXT NOT NULL,
    "term" INT(8) NOT NULL,
PRIMARY KEY("student", "timeIn"));
