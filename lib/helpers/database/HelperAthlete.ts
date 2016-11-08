import * as eta from "../../../index";

export class HelperAthlete {
    /**
    Returns null if an error occurred
    */
    public static isDirector(id: string, callback: (isAthleteDirector: boolean) => void): void {
        let sql: string = `
            SELECT
                *
            FROM
                AthleteDirector
            WHERE
                id = ?`;
        eta.db.query(sql, [id], (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            callback(rows.length != 0);
        });
    }

    /**
    Returns null if they're not an athlete or a database error occurs
    */
    public static isAthlete(id: string, callback: (isAthlete: boolean) => void): void {
        let sql: string = `
            SELECT
                *
            FROM
                Athlete
            WHERE
                id = ?`;
        eta.db.query(sql, [id], (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            callback(rows[0]);
        });
    }
}
