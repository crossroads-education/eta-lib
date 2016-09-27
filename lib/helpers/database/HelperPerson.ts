import * as eta from "../../../index";

export class HelperPerson {

    /**
    Returns -1 if an error occurred.
    */
    private static getLastNonIUID(callback: (lastID: number) => void): void {
        // non-IU IDs are prefixed with 'n'
        let sql: string = `SELECT COUNT(*) AS lastID FROM Person WHERE id LIKE 'n%'`;
        eta.db.query(sql, [], (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(-1);
                return;
            }
            callback(rows[0].lastID);
        });
    }

    /**
    Returns null if an error occurred.
    */
    public static insertNonIU(email: string, firstName: string, lastName: string, callback: (id: string) => void): void {
        HelperPerson.getLastNonIUID((lastID: number) => {
            if (lastID == -1) {
                callback(null);
                return;
            }
            let sql: string = `
                INSERT INTO Person (id, username, email, firstName, lastName)
                VALUES(?, '', ?, ?, ?)
                ON DUPLICATE KEY UPDATE id = VALUES(id)`;
            let id: string = "n" + (lastID + 1);
            eta.db.query(sql, [id, email, firstName, lastName], (err: eta.DBError, rows: any[]) => {
                if (err) {
                    eta.logger.dbError(err);
                    callback(null);
                    return;
                }
                callback(id);
            });
        });
    }

    private static getInternal(moreSql: string, params: any[], callback: (person: eta.Person) => void): void {
        let sql: string = "SELECT * FROM `Person` ";
        eta.db.query(sql + moreSql, params, (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            callback((rows && rows.length > 0) ? rows[0] : null);
        });
    }

    /**
    Gets a person by their unique ID.
    Returns null on failure or not found.
    */
    public static getByID(id: string, callback: (person: eta.Person) => void): void {
        HelperPerson.getInternal("WHERE `id` = ?", [id], callback);
    }

    /**
    Gets a person by their unique username.
    Returns null on failure or not found.
    */
    public static getByUsername(username: string, callback: (person: eta.Person) => void): void {
        HelperPerson.getInternal("WHERE `username` = ?", [username], callback);
    }

    /**
    Gets a person by their unique email.
    Returns null on failure or not found.
    */
    public static getByEmail(email: string, callback: (person: eta.Person) => void): void {
        HelperPerson.getInternal("WHERE `email` = ?", [email], callback);
    }

    /**
    Get a person based on either their username or their id.
    Returns null if they don't exist.
    */
    public static getByUsernameOrID(username: string, id: string, callback: (person: eta.Person) => void): void {
        HelperPerson.getInternal("WHERE `username` = ? OR `id` = ?", [username, id], callback);
    }
}
