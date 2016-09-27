import * as eta from "../../../index";

export class HelperAthlete {
    /**
    Returns null if they're not an athlete or a database error occurs
    */
    public static isAthlete(id: string, callback: (isAthlete: boolean) => void): void {
        let query: string = `
        SELECT
            *
        FROM
            Athlete
        WHERE
            id = ?`;
        eta.db.query(query, [id], (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            callback(rows[0]);
        });
    }
}
