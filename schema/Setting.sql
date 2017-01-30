CREATE TABLE IF NOT EXISTS "Setting" (
    "page" VARCHAR(63) NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "value" TEXT NOT NULL,
    "type" VARCHAR(15) NOT NULL,
PRIMARY KEY("page", "name"));
