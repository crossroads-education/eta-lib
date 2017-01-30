import * as eta from "../../../index";

export class HelperProfessor {
    public static getStudentSections(id: string, callback: (err: Error, studentSections?: eta.StudentSection[]) => void): void {
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
                Section.professor = $1`;
        eta.db.query(query, [id], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result.rows);
        })
    }

    public static getSections(id: string, callback: (err: Error, sections?: eta.Section[]) => void): void {
        let query: string = `
            SELECT
                Section.*
            FROM
                Section
            WHERE
                Section.professor = ?`;
        eta.db.query(query, [id], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            for (let i: number = 0; i < result.rows.length; i++) {
                result.rows[i].term = eta.object.copy(eta.term.get(result.rows[i].term));
            }
            callback(null, result.rows);
        })
    }

}
