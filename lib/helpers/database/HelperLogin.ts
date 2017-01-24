import * as eta from "../../../index";
import * as express from "express";

export class HelperLogin {
    public static login(username : string, req : express.Request, callback: (env: { [key: string]: any }) => void):void {
        req.session["username"] = username;
        eta.db.query("SELECT id FROM Person WHERE username = ?", [username], (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                return callback({ errcode: eta.http.InternalError });
            }
            if (rows.length == 0) {
                return callback({ errcode: eta.http.Forbidden });
            }
            req.session["userid"] = rows[0].id;
            let sql: string = `
                SELECT
                    Position.*,
                    Center.department
                FROM
                    EmployeePosition
                        LEFT JOIN Position ON
                            EmployeePosition.position = Position.id
                        LEFT JOIN Center ON
                            Position.center = Center.id
                WHERE
                    EmployeePosition.id = ? AND
                    EmployeePosition.start <= CURDATE() AND
                    (
                        EmployeePosition.end > CURDATE() OR
                        ISNULL(EmployeePosition.end)
                    )`;
            eta.db.query(sql, [req.session["userid"]], (err: eta.DBError, rows: any[]) => {
                if (err) {
                    eta.logger.dbError(err);
                    return callback({ errcode: eta.http.InternalError });
                }
                req.session["department"] = rows.length > 0 ? rows[0].department : -1;
                req.session["positions"] = rows;
                sql = `SELECT
                        student.count AS student,
                        professor.count AS professor
                    FROM (
                        SELECT
                            COUNT(*) as count
                        FROM
                            StudentSection
                        WHERE
                            student = ?
                    ) AS student, (
                        SELECT
                            COUNT(*) as count
                        FROM
                            Section
                        WHERE
                            professor = ?
                    ) AS professor`;
                eta.db.query(sql, [req.session["userid"], req.session["userid"]], (err: eta.DBError, rows: any[]) => {
                    if (err) {
                        eta.logger.dbError(err);
                        return callback({ errcode: eta.http.InternalError });
                    }
                    if (rows[0].professor != 0) {
                        req.session["isProfessor"] = true;
                    } else if (rows[0].student != 0) {
                        req.session["isStudent"] = true;
                    }
                    callback(null);
                });
            });
        });
    }

}
