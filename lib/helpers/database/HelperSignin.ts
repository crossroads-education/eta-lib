import * as eta from "../../../index";

export interface Course {
    firstName: string;
    subject: string;
    number: number;
    section: string;
}

export class HelperSignin {

    /**
    Tries to get a Person object by email, username, or user ID.
    Returns null if an error occurred or the person was not found.
    */
    public static validate(userid: string, callback: (err: Error, person?: eta.Person) => void): void {
        if (userid.indexOf("@") !== -1) { // email, so non-iu student
            eta.person.getByEmail(userid, callback);
        } else { // probably an IU student
            eta.person.getByUsernameOrID(userid, userid, callback);
        }
    }

    /**
    Signs out (and returns null) if there are any unfinished visits for today.
    If there are no unfinished visits for today, returns a JSON string of classes
        the student is enrolled in.
    */
    public static trySignout(userid: string, callback: (err: Error, result?: Course[]) => void): void {
        let sql: string = `
            UPDATE
                Visit
            SET
                Visit.timeOut = NOW()
            WHERE
                DATE(Visit.timeIn) = CURDATE() AND
                Visit.student = ? AND
                ISNULL(Visit.timeOut)`;
        eta.db.query(sql, [userid], (err: Error, rows: any) => {
            if (err) {
                return callback(err);
            }
            if (rows.affectedRows === 1) { // they had already signed in, and are now signed out.
                return callback(null);
            }
            // get classes they're enrolled in
            sql = `
                SELECT
                    Person.firstName,
                    Course.subject,
                    Course.number,
                    StudentSection.section
                FROM
                    StudentSection
                        LEFT JOIN Section ON
                            StudentSection.section = Section.id
                        LEFT JOIN Course ON
                            Section.course = Course.id
                        LEFT JOIN Person ON
                            StudentSection.student = Person.id
                WHERE
                    StudentSection.student = ? AND
                    Section.term = ? AND
                    Section.meetingType = 'LEC' AND
                    StudentSection.status != 'D'`;
            eta.db.query(sql, [userid, eta.term.getCurrent().id], (err: Error, result: eta.QueryResult) => {
                if (err) {
                    return callback(err);
                }
                callback(null, rows);
            });
        });
    }
}
