import * as eta from "../../../index";

export class HelperPermission {
    public static getUser(userid : string, callback : (user : eta.PermissionUser) => void) : void {
        let sql : string = "SELECT * FROM `UserPermission` WHERE `user` = ?";
        eta.db.query(sql, [userid], (err : eta.DBError, rows : any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            let permissions : string[] = [];
            for (let i : number = 0; i < rows.length; i++) {
                permissions.push(rows[i].permission);
            }
            let user : eta.PermissionUser = new eta.PermissionUser(permissions);
            callback(user);
        });
    }
}
