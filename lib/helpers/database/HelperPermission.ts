import * as eta from "../../../index";

export class HelperPermission {
    public static getUser(userid: string, callback: (err: Error, user?: eta.PermissionUser) => void): void {
        let sql: string = `
            SELECT
                UserPermission.*
            FROM
                UserPermission
            WHERE
                UserPermission.user = $1`;
        eta.db.query(sql, [userid], (err: Error, result: eta.QueryResult) => {
            if (err) {
                eta.logger.error(err);
                callback(null);
                return;
            }
            let permissions: string[] = [];
            for (let i: number = 0; i < result.rows.length; i++) {
                permissions.push(result.rows[i].permission);
            }
            sql = `
                SELECT DISTINCT
                    PositionPermission.permission
                FROM
                    EmployeePosition
                        LEFT JOIN Position ON
                            EmployeePosition.position = Position.id
                        LEFT JOIN PositionPermission ON
                            Position.category = PositionPermission.position OR
                            PositionPermission.position = "ALL"
                WHERE
                    EmployeePosition.id = $1 AND
                    EmployeePosition.start <= CURDATE() AND
                    (
                        ISNULL(EmployeePosition.end) OR
                        EmployeePosition.end >= CURDATE()
                    )`;
            eta.db.query(sql, [userid], (err: Error, result: eta.QueryResult) => {
                if (err) {
                    return callback(err);
                }
                for (let i: number = 0; i < result.rows.length; i++) {
                    permissions.push(result.rows[i].permission);
                }
                let user: eta.PermissionUser = new eta.PermissionUser(permissions);
                callback(null, user);
            });
        });
    }
}
