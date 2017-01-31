import * as eta from "../../../index";

export class HelperStudent {

    public static get(id: string, callback: (err: Error, student?: eta.Student) => void): void {
        let query: string = eta.section.builderQuery + `
                LEFT JOIN (SELECT 0 AS count, 0 AS duration) VisitCount ON 1
                LEFT JOIN StudentSection ON
                    Section.id = StudentSection.section
            WHERE
                StudentSection.student = $1 AND
                StudentSection.status = 'E'`;
        eta.db.query(query, [id], (err: Error, result: eta.QueryResult) => {
            if (err) {
                return callback(err);
            }
            for (let i: number = 0; i < result.rows.length; i++) {
                result.rows[i] = eta.section.build(result.rows[i]);
            }
            callback(null, {
                "id": id,
                "sections": result.rows
            });
        });
    }
}
