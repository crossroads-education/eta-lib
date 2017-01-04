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

    public static getLongestHoursForDay(day: number, term: number, callback: (err: Error, hours?: eta.HoursOfOperation) => void): void {
        let sql: string = `
            SELECT
                MIN(HoursOfOperation.open) AS open,
                MAX(HoursOfOperation.close) AS close
            FROM
                HoursOfOperation
            WHERE
                HoursOfOperation.open != '00:00:00' AND
                HoursOfOperation.close != '00:00:00' AND
                HoursOfOperation.term = ? AND
                HoursOfOperation.day = ?`;
        eta.db.query(sql, [term, day], (err: eta.DBError, rows: any[]) => {
            if (err) {
                return callback(err);
            }
            if (rows.length == 0) {
                return callback(null, null);
            }
            return callback(null, {
                "term": term,
                "day": day,
                "open": rows[0].open,
                "close": rows[0].close,
                "center": -1
            });
        });
    }

    public static getLongestHoursForAllDays(term: number, callback: (err: Error, hours?: { [key: number]: eta.HoursOfOperation }) => void): void {
        let sql: string = `
            SELECT
                HoursOfOperation.day,
                MIN(HoursOfOperation.open) AS open,
                MAX(HoursOfOperation.close) AS close
            FROM
                HoursOfOperation
            WHERE
                HoursOfOperation.open != '00:00:00' AND
                HoursOfOperation.close != '00:00:00' AND
                HoursOfOperation.term = ?
            GROUP BY HoursOfOperation.day`;
        eta.db.query(sql, [term], (err: Error, rows: any[]) => {
            if (err) {
                return callback(err);
            }
            let hours: { [key: number]: eta.HoursOfOperation } = {};
            for (let i: number = 0; i < rows.length; i++) {
                hours[rows[i].day] = {
                    "term": term,
                    "day": rows[i].day,
                    "open": rows[i].open,
                    "close": rows[i].close,
                    "center": -1
                };
            }
            callback(null, hours);
        });
    }

    public static getLongestHoursForWeek(term: number, callback: (err: Error, hours?: eta.HoursOfOperation) => void): void {
        let sql: string = `
            SELECT
                MIN(HoursOfOperation.open) AS open,
                MAX(HoursOfOperation.close) AS close
            FROM
                HoursOfOperation
            WHERE
                HoursOfOperation.open != '00:00:00' AND
                HoursOfOperation.close != '00:00:00' AND
                HoursOfOperation.term = ?`;
        eta.db.query(sql, [term], (err: Error, rows: any[]) => {
            if (err) {
                return callback(err);
            }
            callback(null, {
                "open": rows[0].open,
                "close": rows[0].close,
                "center": -1,
                "day": -1,
                "term": term
            });
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
