import * as eta from "../../../index";

export class HelperProfessor {
    public static getStudents(id : string, callback : (studentSection : eta.StudentSection[]) => void) : void {
        let query : string = `
        SELECT
            StudentSection.*
        FROM
            StudentSection, Section
        WHERE
            Section.professor = ? AND
            StudentSection.section = Section.id
            `;
        eta.db.query(query, [id], (err : eta.DBError, rows : any []) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            callback(rows);
        })
    }

    public static getSections(id : string, callback : (sections : eta.Section[]) => void) : void {
        let query : string = `
        SELECT
            Section.*
        From
            Section
        WHERE
            Section.professor = ?
        `;
        eta.db.query(query, [id], (err : eta.DBError, rows : any []) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            callback(rows);
        })
    }

}
