import * as eta from "../../../index";


export class HelperSignin {

    public static validate(userid : string, callback : (result : string | number) => void) : void {
        if (userid.indexOf("@") > -1) {
            eta.db.query('SELECT id FROM Person WHERE email = ?', [userid], (err : eta.DBError, rows : any[]) => {
                if (err) {
                    eta.logger.dbError(err);
                    callback(eta.http.InternalError);
                    return;
                }
                eta.logger.trace(rows[0].id);
                eta.person.getByID(rows[0].id, (person: eta.Person) => {
                    if (!person) {
                        callback(eta.http.NotFound);
                        return;
                    } else {
                        HelperSignin.signin(person.id, callback);
                        return;
                    }
                })
            })
        }
        eta.person.getByUsernameOrID(userid, userid, (person : eta.Person) => {
            if (!person) {
                callback(eta.http.NotFound);
                return;
            } else {
                HelperSignin.signin(person.id, callback);
                return;
            }
        });
    }

    public static signin(userid : string, callback : (result : string | number) => void) : void {
        let sql : string = `
            UPDATE Visit
            SET
                timeOut = NOW()
            WHERE
                DATE(timeIn) = CURDATE() AND
                student = ? AND
                ISNULL(timeOut)`;
        eta.db.query(sql, [userid], (err : eta.DBError, rows : any) => {
            if (err) {
                eta.logger.dbError(err);
                callback(eta.http.InternalError);
                return;
            }
            if (rows.affectedRows === 1) {
                callback("false");
                return;
            }
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
            eta.db.query(sql, [userid, eta.term.getCurrent().id], (err : eta.DBError, rows : any[]) => {
                if (err) {
                    eta.logger.dbError(err);
                    callback(eta.http.InternalError);
                    return;
                }
                callback(JSON.stringify(rows));
            })
        })
    }
}
