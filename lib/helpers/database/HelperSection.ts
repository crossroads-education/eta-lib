import * as eta from "../../../index";

export class HelperSection {
    public static builderQuery: string = `
        SELECT
            Section.*,
            Course.id AS "cid",
            Course.subject AS "csubject",
            Course.number AS "cnumber",
            Course.supported AS "csupported",
            Course.center AS "ccenter",
            Course.tutor AS "ctutor",
            Course.room AS "croom",
            Course.fee AS "cfee",
            VisitCount.count AS "visitCount",
            VisitCount.duration AS "visitDuration"
        FROM
            Section
                LEFT JOIN Course ON
                    Section.course = Course.id
        `;

    private static get(moreSql: string, params: any[], callback: (sections: eta.Section[]) => void): void {
        eta.db.query(HelperSection.builderQuery + moreSql, params, (err: eta.DBError, rows: any[]) => {
            if (err) {
                eta.logger.dbError(err);
                callback(null);
                return;
            }
            let sections: eta.Section[] = [];
            for (let i: number = 0; i < rows.length; i++) {
                sections.push(HelperSection.build(rows[i]));
            }
            callback(sections);
        });
    }

    private static getWithVisits(visitWhere: string, moreSql: string, params: any[], callback: (sections: eta.Section[]) => void): void {
        let sql: string = `
            LEFT JOIN (
                SELECT
                    Section.id AS section,
                    COUNT(DISTINCT Visit.student, Visit.timeIn) AS count,
                    ROUND(SUM(TIME_TO_SEC(TIMEDIFF(Visit.timeOut, Visit.timeIn))) / 3600, 2) AS duration
                FROM
                    Visit
                        RIGHT JOIN Section ON
                            Visit.section REGEXP Section.id
                ${visitWhere}
                GROUP BY Section.id
            ) VisitCount ON
                Section.id = VisitCount.section
        `;
        HelperSection.get(sql + moreSql, params, callback);
    }

    public static getByProfessor(userid: string, callback: (sections: eta.Section[]) => void): void {
        let whereSql: string = "WHERE Section.professor = ?";
        HelperSection.getWithVisits(whereSql, whereSql, [userid, userid], callback);
    }

    public static getByID(id: string, callback: (section: eta.Section) => void): void {
        let whereSql: string = "WHERE Section.id = ?";
        HelperSection.getWithVisits(whereSql, whereSql, [id, id], (sections: eta.Section[]) => {
            callback(sections[0]);
        });
    }

    public static build(row: any): eta.Section {
        return {
            "course": {
                "id": row.cid,
                "isSupported": row.csupported == 1,
                "center": row.ccenter,
                "number": row.cnumber,
                "subject": row.csubject,
                "tutor": row.ctutor,
                "room": row.croom,
                "fee": row.fee
            },
            "id": row.id,
            "active": row.active == 1,
            "room": row.room,
            "maximumEnrolled": row.maximumEnrolled,
            "totalEnrolled": row.totalEnrolled,
            "creditHours": row.creditHours,
            "number": row.number,
            "term": eta.term.get(row.term),
            "meetingType": row.meetingType,
            "professor": row.professor,
            "visitDuration": row.visitDuration ? row.visitDuration : 0,
            "visitCount": row.visitCount
        };
    }

    public static hasCurrentSections(sections: eta.Section[], termID: number): boolean {
        for (let i: number = 0; i < sections.length; i++) {
            if (sections[i].term.id == termID) {
                return true;
            }
        }
        return false;
    }

    /**
    Returns only the sections in `sections` for which section.term.id == currentTermID
    */
    public static removePrevious(rawSections: eta.Section[], currentTermID: number): eta.Section[] {
        let sections: eta.Section[] = [];
        for (let i: number = 0; i < rawSections.length; i++) {
            if (rawSections[i].term.id == currentTermID) {
                sections.push(rawSections[i]);
            }
        }
        return sections;
    }

    /**
    Sorts sections alphabetically (ascending) by course subject and number.
    Use with Array.prototype.sort.
    */
    public static sort(a: eta.Section, b: eta.Section): number {
        if (a.course.subject == b.course.subject) {
            return a.course.number.localeCompare(b.course.number);
        }
        return a.course.subject.localeCompare(b.course.subject);
    }
}
