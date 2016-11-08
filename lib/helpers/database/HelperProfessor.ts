import * as eta from "../../../index";

export class HelperProfessor {
    public static getStudentSections(id: string, callback: (studentSections: eta.StudentSection[]) => void): void {
        let query: string = `
            SELECT
                StudentSection.section,
                StudentSection.status,
                Person.*
            FROM
                StudentSection
                    LEFT JOIN Section ON
                        StudentSection.section = Section.id
                    LEFT JOIN Person ON
                        StudentSection.student = Person.id
            WHERE
                Section.professor = ?`;
        eta.db.query(query, [id], (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            callback(rows);
        })
    }

    public static getSections(id: string, callback: (sections: eta.Section[]) => void): void {
        let query: string = `
            SELECT
                Section.*
            FROM
                Section
            WHERE
                Section.professor = ?`;
        eta.db.query(query, [id], (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            for (let i: number = 0; i < rows.length; i++) {
                rows[i].term = eta.object.copy(eta.term.get(rows[i].term));
            }
            callback(rows);
        })
    }

}
