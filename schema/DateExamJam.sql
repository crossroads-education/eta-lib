CREATE TABLE IF NOT EXISTS "DateExamJam" (
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "course" INT(8) NOT NULL,
PRIMARY KEY ("start", "end", "course"));
