import * as eta from "../../../index";

export class HelperCourse {
    public static get(id: number, callback: (course: eta.Course) => void): void {
        eta.db.query("SELECT * FROM `Course` WHERE id = ?", [id], (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            callback(rows[0]);
        });
    }
}
