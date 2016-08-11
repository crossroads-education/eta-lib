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
        eta.db.query("SELECT * FROM Term", [], (err : eta.DBError, rows : any[]) => {
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

    public static getClosest(term? : eta.Term, useLongSummer : boolean = false) : eta.Term[] {
        if (!term) {
            term = HelperTerm.getCurrent();
        }
        let current : number = Number(term.term);
        let terms : eta.Term[] = [];
        for (let i : number = current - 5; i <= current + 5; i++) {
            for (let k : number = 0; k < eta.term.terms.length; k++) {
                let term : eta.Term = eta.term.terms[k];
                if (term.term == i.toString()) {
                    if ((useLongSummer && term.session != "1") ||
                        (!useLongSummer && term.term.endsWith("5") && term.session == "1")) {
                        continue;
                    }
                    terms.push(eta.object.copy(term));
                    if (!(!useLongSummer && term.term.endsWith("5"))) {
                        break;
                    }
                }
            }
        }
        return terms;
    }

    /**
    Returns whatever term we're currently in, or the previous term if we're in between terms.
    */
    public static getCurrent(useLongSummer : boolean = false, today : Date = new Date()) : eta.Term {
        for (let i : number = 0; i < HelperTerm.terms.length; i++) {
            if (!useLongSummer && HelperTerm.terms[i].term.endsWith("5") && HelperTerm.terms[i].session == "1") { // summer 1 is never current
                continue;
            }
            if (useLongSummer && HelperTerm.terms[i].term.endsWith("5") && HelperTerm.terms[i].session !== "1") {
                continue;
            }
            if (HelperTerm.terms[i].start.getTime() <= today.getTime() && HelperTerm.terms[i].end.getTime() >= today.getTime()) {
                return eta.object.copy(HelperTerm.terms[i]);
            }
        }
        // use last week's day (for in between terms)
        today.setDate(today.getDate() - 7);
        return HelperTerm.getCurrent(useLongSummer, today);
    }
}
