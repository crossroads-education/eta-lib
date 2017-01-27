import * as eta from "../../../index";
import * as express from "express";

export class HelperLogin {
    public static login(username: string, req: express.Request, callback: (env: { [key: string]: any }) => void): void {
        req.session["username"] = username;
        let sql: string = `
            SELECT
                Person.id
            FROM
                Person
            WHERE
                Person.username = $1`;
        eta.db.query(sql, [username], (err: Error, result: eta.QueryResult) => {
            if (err) {
                eta.logger.error(err);
                return callback({ errcode: eta.http.InternalError });
            }
            if (result.rows.length == 0) {
                return callback({ errcode: eta.http.Forbidden });
            }
            req.session["userid"] = result.rows[0].id;
            sql = `
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
                    EmployeePosition.id = $1 AND
                    EmployeePosition.start <= CURDATE() AND
                    (
                        EmployeePosition.end > CURDATE() OR
                        ISNULL(EmployeePosition.end)
                    )`;
            eta.db.query(sql, [req.session["userid"]], (err: Error, result: eta.QueryResult) => {
                if (err) {
                    eta.logger.error(err);
                    return callback({ errcode: eta.http.InternalError });
                }
                req.session["department"] = result.rows.length > 0 ? result.rows[0].department : -1;
                req.session["positions"] = result.rows;
                sql = `SELECT
                        student.count AS student,
                        professor.count AS professor
                    FROM (
                        SELECT
                            COUNT(*) as count
                        FROM
                            StudentSection
                        WHERE
                            student = $1
                    ) AS student, (
                        SELECT
                            COUNT(*) as count
                        FROM
                            Section
                        WHERE
                            professor = $2
                    ) AS professor`;
                eta.db.query(sql, [req.session["userid"], req.session["userid"]], (err: Error, result: eta.QueryResult) => {
                    if (err) {
                        eta.logger.error(err);
                        return callback({ errcode: eta.http.InternalError });
                    }
                    if (result.rows[0].professor != 0) {
                        req.session["isProfessor"] = true;
                    } else if (result.rows[0].student != 0) {
                        req.session["isStudent"] = true;
                    }
                    callback(null);
                });
            });
        });
    }

}
