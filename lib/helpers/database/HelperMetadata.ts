import * as eta from "../../../index";

export class HelperMetadata {
    private static queryInternal(sql: string, params: any[], callback: (metadata: eta.PageMetadata[]) => void): void {
        eta.db.query(sql, params, (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            callback(rows);
        });
    }

    /**
    Gets a single metadata value for a key, relating to a page.
    Returns null on failure.
    */
    public static get(page: string, key: string, callback: (metadata: eta.PageMetadata) => void): void {
        let sql: string = "SELECT * FROM `PageMetadata` WHERE `page` = ? AND `key` = ?";
        HelperMetadata.queryInternal(sql, [page, key], (rows: eta.PageMetadata[]) => {
            callback(rows ? rows[0] : null);
        });
    }

    /**
    Gets an array of metadata values relating to a page.
    Returns null on failure.
    */
    public static getForPage(page: string, callback: (metadata: { [key: string]: eta.PageMetadata }) => void): void {
        let sql: string = "SELECT * FROM `PageMetadata` WHERE `page` = ?";
        HelperMetadata.queryInternal(sql, [page], (rows: eta.PageMetadata[]) => {
            let metadata: { [key: string]: eta.PageMetadata } = {};
            for (let i: number = 0; i < rows.length; i++) {
                metadata[rows[i].key] = rows[i];
            }
            callback(metadata);
        });
    }

    /**
    Sets a metadata value by key, relating to a page.
    */
    public static set(page: string, key: string, value: string, alt: string, callback?: (success: boolean) => void): void {
        let sql: string = "INSERT INTO `PageMetadata` (`page`, `key`, `value`, `alt`) VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE `value` = ?, `alt` = ?";
        HelperMetadata.queryInternal(sql, [page, key, value, alt, value, alt], (metadata: eta.PageMetadata[]) => {
            callback(!!metadata);
        });
    }
}
