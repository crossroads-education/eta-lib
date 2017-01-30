import * as eta from "../../../index";

export class HelperPerson {

    public static isNonIUID(id: string): boolean {
        return /^n[0-9]+$/.test(id);
    }

    /**
    Returns -1 if an error occurred.
    */
    private static getLastNonIUID(callback: (err: Error, lastID?: number) => void): void {
        // non-IU IDs are prefixed with 'n'
        let sql: string = `
            SELECT
                COUNT(*) AS lastID
            FROM
                Person
            WHERE
                id LIKE 'n%'`;
        eta.db.query(sql, [], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.rows[0].lastID);
        });
    }

    /**
    Returns null if an error occurred.
    */
    public static insertNonIU(username: string, email: string, firstName: string, lastName: string, callback: (err: Error, id?: string) => void): void {
        HelperPerson.getLastNonIUID((err: Error, lastID: number) => {
            if (err) {
                return callback(err);
            }
            let sql: string = `
                INSERT INTO Person (id, username, email, firstName, lastName)
                VALUES($1, $2, $3, $4, $5)
                ON DUPLICATE KEY UPDATE
                    id = VALUES(id)`;
            let id: string = "n" + (lastID + 1);
            if (!username || username === "") {
                username = id;
            }
            eta.db.query(sql, [id, username, email, firstName, lastName], (err: Error, result: eta.QueryResult) => {
                if (err) {
                    eta.logger.error(err);
                    callback(null);
                    return;
                }
                callback(null, id);
            });
        });
    }

    private static getInternal(moreSql: string, params: any[], callback: (err: Error, person?: eta.Person) => void): void {
        let sql: string = `
            SELECT
                Person.*
            FROM
                Person
            ${moreSql}`;
        eta.db.query(sql, params, (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            callback(result.rows[0]);
        });
    }

    /**
    Gets a person by their unique ID.
    Returns null on failure or not found.
    */
    public static getByID(id: string, callback: (err: Error, person?: eta.Person) => void): void {
        HelperPerson.getInternal("WHERE `id` = $1", [id], callback);
    }

    /**
    Gets a person by their unique username.
    Returns null on failure or not found.
    */
    public static getByUsername(username: string, callback: (err: Error, person?: eta.Person) => void): void {
        HelperPerson.getInternal("WHERE `username` = $1", [username], callback);
    }

    /**
    Gets a person by their unique email.
    Returns null on failure or not found.
    */
    public static getByEmail(email: string, callback: (err: Error, person?: eta.Person) => void): void {
        HelperPerson.getInternal("WHERE `email` = $1", [email], callback);
    }

    /**
    Get a person based on either their username or their id.
    Returns null if they don't exist.
    */
    public static getByUsernameOrID(username: string, id: string, callback: (err: Error, person?: eta.Person) => void): void {
        if (username == "" && id == "") {
            return callback(null);
        }
        let sql: string = "WHERE `id` = $1";
        if (!HelperPerson.isNonIUID(id)) { // IU
            sql += " OR `username` = $2";
        }
        HelperPerson.getInternal(sql, [id, username], callback);
    }
}
