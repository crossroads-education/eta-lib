import * as eta from "../../../index";

export class HelperPerson {
    private static getInternal(moreSql : string, params : any[], callback : (person : eta.Person) => void) : void {
        let sql : string = "SELECT * FROM `Person` ";
        eta.db.query(sql + moreSql, params, (err : eta.DBError, rows : any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            callback((rows && rows.length > 0) ? rows[0] : null);
        });
    }

    public static getByID(id : string, callback : (person : eta.Person) => void) : void {
        HelperPerson.getInternal("WHERE `id` = ?", [id], callback);
    }

    public static getByUsername(username : string, callback : (person : eta.Person) => void) : void {
        HelperPerson.getInternal("WHERE `username` = ?", [username], callback);
    }
}
