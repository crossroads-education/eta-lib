import * as eta from "../../../index";

export class HelperCenter {
    /**
    Returns null on failure.
    */
    public static getAll(callback: (err: Error, centers?: eta.Center[]) => void): void {
        let sql: string = "SELECT * FROM Center";
        eta.db.query(sql, [], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.rows);
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
                HoursOfOperation.term = $1 AND
                HoursOfOperation.day = $2`;
        eta.db.query(sql, [term, day], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            if (result.rows.length == 0) {
                return callback(null, null);
            }
            return callback(null, {
                "term": term,
                "day": day,
                "open": result.rows[0].open,
                "close": result.rows[0].close,
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
                HoursOfOperation.term = $1
            GROUP BY HoursOfOperation.day`;
        eta.db.query(sql, [term], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            let hours: { [key: number]: eta.HoursOfOperation } = {};
            for (let i: number = 0; i < result.rows.length; i++) {
                hours[result.rows[i].day] = {
                    "term": term,
                    "day": result.rows[i].day,
                    "open": result.rows[i].open,
                    "close": result.rows[i].close,
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
                HoursOfOperation.term = $1`;
        eta.db.query(sql, [term], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            callback(null, {
                "open": result.rows[0].open,
                "close": result.rows[0].close,
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
                HoursOfOperation.center = $1 AND
                HoursOfOperation.term = $2`;
        eta.db.query(sql, [id, term], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            let hours: { [key: number]: eta.HoursOfOperation } = {};
            for (let i: number = 0; i < result.rows.length; i++) {
                hours[result.rows[i].day] = result.rows[i];
            }
            return callback(null, hours);
        });
    }
}
