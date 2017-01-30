CREATE TABLE IF NOT EXISTS "UserPermission" (
    "user" CHAR(10) NOT NULL,
    "permission" VARCHAR(64) NOT NULL,
PRIMARY KEY("user", "permission"));
