import * as eta from "../../../index";

export class HelperStudent {

    public static get(id: string, callback: (student: eta.Student) => void): void {
        let query: string = eta.section.builderQuery + `
                LEFT JOIN (SELECT 0 AS count, 0 AS duration) VisitCount ON 1
                LEFT JOIN StudentSection ON
                    Section.id = StudentSection.section
            WHERE
                StudentSection.student = ? AND
                StudentSection.status = 'E'`;
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
