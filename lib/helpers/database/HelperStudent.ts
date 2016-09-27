import * as eta from "../../../index";

export class HelperStudent {

    public static get(id: string, callback: (student: eta.Student) => void): void {
        let query: string = eta.section.builderQuery + `
        WHERE
            StudentSection.student = ? AND
            Section.id = StudentSection.section AND
            Course.id = Section.course
            `;
        eta.db.query(query, [id], (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            for (let i in rows) {
                rows[i] = eta.section.build(rows[i]);
            }
            callback({
                "id": id,
                "sections": rows
            });
        });
    }
}
