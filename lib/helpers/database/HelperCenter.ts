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

    public static getHours(id: number, term: number, callback: (err: Error, hours?: { [key: number]: eta.HoursOfOperation }) => void): void {
        let sql: string = `
            SELECT
                HoursOfOperation.*
            FROM
                HoursOfOperation
            WHERE
                HoursOfOperation.center = ? AND
                HoursOfOperation.term = ?`;
        eta.db.query(sql, [id, term], (err: eta.DBError, rows: any[]) => {
            if (err) {
                return callback(err);
            }
            let hours: { [key: number]: eta.HoursOfOperation } = {};
            for (let i: number = 0; i < rows.length; i++) {
                hours[rows[i].day] = rows[i];
            }
            return callback(null, hours);
        });
    }
}
