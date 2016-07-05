import * as eta from "../../../index";

export class HelperTerm {

    /**
    All terms that we have records for.
    This is updated whenever init() is run.
    */
    public static terms : eta.Term[];

    /**
    Updates `this.terms` with all data in the Term table.
    */
    public static init() : void {
        HelperTerm.terms = [];
        eta.db.query("SELECT * FROM `Term` WHERE NOT (`term` LIKE '%5' AND `session` = 1)", [], (err : eta.DBError, rows : any[]) => {
            if (err) {
                eta.logger.dbError(err);
                return;
            }
            HelperTerm.terms = rows;
        });
    }

    public static get(id : number) : eta.Term {
        for (let i : number = 0; i < HelperTerm.terms.length; i++) {
            if (HelperTerm.terms[i].id == id) {
                return HelperTerm.terms[i];
            }
        }
        return null;
    }

    /**
    Returns whatever term we're currently in, or null if we're in between terms.
    */
    public static getCurrent() : eta.Term {
        let today : number = new Date().getTime();
        for (let i : number = 0; i < HelperTerm.terms.length; i++) {
            if (HelperTerm.terms[i].start.getTime() < today && HelperTerm.terms[i].end.getTime() >= today) {
                return eta.object.copy(HelperTerm.terms[i]);
            }
        }
        return null;
    }
}
