import * as eta from "../../../index";

export class HelperStudent {

    public static get(id : string, callback : (student : eta.Student) => void) : void {
        let query : string = `
        SELECT
            \`Section\`.*,
            Course.id AS "cid",
            Course.subject AS "csubject",
            Course.number AS "cnumber",
            Course.supported AS "csupported",
            Course.center AS "ccenter",
            Course.tutor AS "ctutor",
            Course.room AS "croom"
        FROM
            StudentSection, Course, Section
        WHERE
            StudentSection.student = ? AND
            Section.id = StudentSection.section AND
            Course.id = Section.course
            `;
        eta.db.query(query, [id], (err : eta.DBError, rows : any[]) => {
            if(err){
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            for( let i in rows ) {
                (<eta.Section[]>rows)[i] = {
                    "course" : {
                        "id" : rows[i].cid,
                        "isSupported" : rows[i].csupported == 1,
                        "center" : rows[i].ccenter,
                        "number" : rows[i].cnumber,
                        "subject" : rows[i].csubject,
                        "tutor" : rows[i].ctutor,
                        "room" : rows[i].croom
                    },
                    "id" : rows[i].id,
                    "active" : rows[i].active == 1,
                    "room" : rows[i].room,
                    "maximumEnrollment" : rows[i].maximumEnrollment,
                    "totalEnrollment" : rows[i].totalEnrollment,
                    "creditHours" : rows[i].creditHours,
                    "number" : rows[i].number,
                    "term" : eta.term.get(rows[i].term),
                    "meetingType" : rows[i].meetingType,
                }
            }
            callback( {
                "id" : id,
                "sections" : rows
            } );
        } );
    }
}
