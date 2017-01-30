CREATE TABLE IF NOT EXISTS "Applicant" (
    "id" CHAR(10) NOT NULL,
    "evaluate" TINYINT(1) NOT NULL DEFAULT 0,
    "interview" TINYINT(1) NOT NULL DEFAULT 0,
    "hire" TINYINT(1) NOT NULL DEFAULT 0,
    "notes" TEXT NOT NULL,
    "workStudy" TINYINT(1) NOT NULL,
    "expectedGraduation" DATE,
    "phone" VARCHAR(12) NOT NULL,
    "altEmail" VARCHAR(63) NOT NULL,
PRIMARY KEY("id"));
