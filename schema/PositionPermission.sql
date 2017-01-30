CREATE TABLE IF NOT EXISTS "PositionPermission" (
    "position" VARCHAR(31) NOT NULL,
    "permission" VARCHAR(64) NOT NULL,
PRIMARY KEY("department", "position", "permission"));
