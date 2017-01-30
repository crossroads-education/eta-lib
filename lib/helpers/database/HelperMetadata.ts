import * as eta from "../../../index";

export class HelperMetadata {
    /**
    Gets a single metadata value for a key, relating to a page.
    Returns null on failure.
    */
    public static get(page: string, key: string, callback: (err: Error, metadata?: eta.PageMetadata) => void): void {
        let sql: string = `
            SELECT
                PageMetadata.*
            FROM
                PageMetadata
            WHERE
                page = $1 AND
                key = $2`;
        eta.db.query(sql, [page, key], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.rows[0]);
        });
    }

    /**
    Gets an array of metadata values relating to a page.
    Returns null on failure.
    */
    public static getForPage(page: string, callback: (err: Error, metadata?: { [key: string]: eta.PageMetadata }) => void): void {
        let sql: string = `
            SELECT
                PageMetadata.*
            FROM
                PageMetadata
            WHERE
                id = $1`;
        eta.db.query(sql, [page], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            let metadata: { [key: string]: eta.PageMetadata } = {};
            for (let i: number = 0; i < result.rows.length; i++) {
                metadata[result.rows[i].key] = result.rows[i];
            }
            callback(null, metadata);
        });
    }

    /**
    Sets a metadata value by key, relating to a page.
    */
    public static set(page: string, key: string, value: string, alt: string, callback?: (err: Error, success?: boolean) => void): void {
        let sql: string = `
            INSERT INTO PageMetadata (page, key, value, alt)
            VALUES ($1, $2, $3, $4)
            ON DUPLICATE KEY UPDATE
                value = VALUES(value),
                alt = VALUES(alt)`;
        eta.db.query(sql, [page, key, value, alt], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            callback(null, true);
        });
    }
}
