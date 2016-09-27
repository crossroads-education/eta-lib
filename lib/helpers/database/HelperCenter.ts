import * as eta from "../../../index";

export class HelperCenter {
    /**
    Returns null on failure.
    */
    public static getAll(callback: (centers: eta.Center[]) => void): void {
        eta.db.query("SELECT * FROM `Center`", [], (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            callback(rows);
        });
    }
}
