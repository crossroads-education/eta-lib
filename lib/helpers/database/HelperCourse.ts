import * as eta from "../../../index";

export class HelperCourse {
    public static get(id: number, callback: (err: Error, course?: eta.Course) => void): void {
        let sql: string = `
            SELECT
                *
            FROM
                Course
            WHERE
                id = $1`;
        eta.db.query(sql, [id], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.rows[0]);
        });
    }
}
