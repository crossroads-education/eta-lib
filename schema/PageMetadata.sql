CREATE TABLE IF NOT EXISTS "PageMetadata" (
    "page" VARCHAR(63) NOT NULL,
    "key" VARCHAR(63) NOT NULL,
    "type" VARCHAR(15) NOT NULL,
    "value" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
PRIMARY KEY("page", "key"));
