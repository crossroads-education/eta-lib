import * as eta from "../../../index";

export class HelperAthlete {
    public static isDirector(id: string, callback: (err: Error, isAthleteDirector?: boolean) => void): void {
        let sql: string = `
            SELECT
                AthleteDirector.*
            FROM
                AthleteDirector
            WHERE
                AthleteDirector.id = $1`;
        eta.db.query(sql, [id], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.rows.length != 0);
        });
    }

    /**
    Returns null if they're not an athlete
    */
    public static isAthlete(id: string, callback: (err: Error, isAthlete?: boolean) => void): void {
        let sql: string = `
            SELECT
                Athlete.*
            FROM
                Athlete
            WHERE
                Athlete.id = $1`;
        eta.db.query(sql, [id], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.rows.length > 0 ? result.rows[0] : null);
        });
    }
}
