import * as eta from "../../../index";

export class HelperVisit {
    public static insert(visits: eta.Visit[]): void {
        if (visits.length === 0) {
            eta.logger.trace("Visits are empty.");
            return;
        }
        let values: eta.SqlValueResult = eta.sql.getInsertMany(visits, true);
        let sql: string = `
            INSERT INTO Visit ${values.columns}
            VALUES ${values.sql}
            ON DUPLICATE KEY UPDATE timeOut = VALUES(timeOut)`;
        eta.db.query(sql, values.params, (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
            }
        });
    }
}
