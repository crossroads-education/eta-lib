import * as eta from "../../../index";

interface PseudoSection {
    id: number,
    number: string,
    term: string
}

interface PseudoVisit {
    student: string,
    timeIn: Date,
    sections: PseudoSection[]
}

export class HelperVisit {
    public static insert(visits: eta.Visit[], callback: (err: Error) => void): void {
        if (visits.length === 0) {
            eta.logger.trace("Visits are empty.");
            return callback(null);
        }
        let values: eta.SqlValueResult = eta.sql.getInsertMany(visits, true);
        let sql: string = `
            INSERT INTO Visit ${values.columns}
            VALUES ${values.sql}
            ON DUPLICATE KEY UPDATE timeOut = VALUES(timeOut)`;
        eta.db.query(sql, values.params, (err: Error, rows: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }

    public static getMultipleSql(): string {
        return `
            SELECT
                Visit.student,
                Visit.timeIn,
                Section.id AS sectionID,
                Section.number AS sectionNumber,
                Term.term
            FROM
                Visit
                    RIGHT JOIN Section ON
                        Visit.section REGEXP Section.id
                    RIGHT JOIN Term ON
                        Section.term = Term.id`;
    }

    public static parseMultiples(raw: any[]): PseudoVisit[] {
        let tempVisits: { [key: string]: PseudoVisit } = {};
        for (let i: number = 0; i < raw.length; i++) {
            let key: string = raw[i].student + "_" + raw[i].timeIn.toISOString();
            if (!tempVisits[key]) {
                raw[i].timeIn.setHours(raw[i].timeIn.getHours() - 4);
                tempVisits[key] = {
                    student: raw[i].student,
                    timeIn: raw[i].timeIn,
                    sections: []
                }
            }
            tempVisits[key].sections.push({
                id: raw[i].sectionID,
                number: raw[i].sectionNumber,
                term: raw[i].term
            });
        }
        let visits: PseudoVisit[] = [];
        for (let i in tempVisits) {
            visits.push(tempVisits[i]);
        }
        return visits;
    }
}
