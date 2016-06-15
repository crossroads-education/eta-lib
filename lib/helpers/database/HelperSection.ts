import * as eta from "../../../index";

export class HelperSection {
    public static builderQuery : string = `SELECT
        \`Section\`.*,
        Course.id AS "cid",
        Course.subject AS "csubject",
        Course.number AS "cnumber",
        Course.supported AS "csupported",
        Course.center AS "ccenter",
        Course.tutor AS "ctutor",
        Course.room AS "croom",
        Course.fee AS "cfee"
    FROM
        StudentSection, Course, Section`;
    public static get(id : number, callback : (section : eta.Section) => void) : void {
        let query : string = `
        SELECT
            *
        FROM
            Section
        WHERE
            id = ?`;

        eta.db.query(query, [id], (err : eta.DBError, rows : any []) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }

            callback(HelperSection.build(rows[0]));
        })
    }

    public static build(row : any) : eta.Section {
        return{
            "course" : {
                "id" : row.cid,
                "isSupported" : row.csupported == 1,
                "center" : row.ccenter,
                "number" : row.cnumber,
                "subject" : row.csubject,
                "tutor" : row.ctutor,
                "room" : row.croom,
                "fee" : row.fee
            },
            "id" : row.id,
            "active" : row.active == 1,
            "room" : row.room,
            "maximumEnrollment" : row.maximumEnrollment,
            "totalEnrollment" : row.totalEnrollment,
            "creditHours" : row.creditHours,
            "number" : row.number,
            "term" : eta.term.get(row.term),
            "meetingType" : row.meetingType,
        };
    }
}
