import * as eta from "../../../index";

export class HelperPosition {
    public static getAllNames(department: number, callback: (err: Error, names?: string[]) => void): void {
        let sql: string = `
            SELECT DISTINCT
                Position.name
            FROM
                Position
                    LEFT JOIN Center ON
                        Position.center = Center.id
            WHERE
                Center.department = $1 AND
                Position.active = 1
            ORDER BY
                Position.name ASC`;
        eta.db.query(sql, [department], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            let names: string[] = [];
            for (let i: number = 0; i < result.rows.length; i++) {
                names.push(result.rows[i].name);
            }
            return callback(null, names);
        });
    }

    public static getAllCategories(department: number, callback: (err: Error, categories?: string[]) => void): void {
        let sql: string = `
            SELECT DISTINCT
                Position.category
            FROM
                Position
                    LEFT JOIN Center ON
                        Position.center = Center.id
            WHERE
                Center.department = ? AND
                Position.active = 1
            ORDER BY
                Position.category ASC`;
        eta.db.query(sql, [department], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            let categories: string[] = [];
            for (let i: number = 0; i < result.rows.length; i++) {
                categories.push(result.rows[i].category);
            }
            return callback(null, categories);
        });
    }
}
