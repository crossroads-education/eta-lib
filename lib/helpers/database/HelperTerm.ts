import * as eta from "../../../index";

export class HelperTerm {
    public static terms : eta.Term[];
    public static init() : void {
        HelperTerm.terms = [];
        eta.db.query("SELECT * FROM `Term`", [], (err : eta.DBError, rows : any[]) => {
            if (err) {
                eta.logger.dbError(err);
                return;
            }
            HelperTerm.terms = rows;
        });
    }
    public static getCurrent() : eta.Term {
        let today : number = new Date().getTime();
        for (let i : number = 0; i < HelperTerm.terms.length; i++) {
            if (HelperTerm.terms[i].start.getTime() < today && HelperTerm.terms[i].end.getTime() >= today) {
                return HelperTerm.terms[i];
            }
        }
        return null;
    }
}
