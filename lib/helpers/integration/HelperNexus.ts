import * as eta from "../../../index";

import * as nexus from "../../integration/nexus";

let levelCenters: { [key: number]: eta.Center };

/**
For level-center mapping
*/
export function init(): void {
    let sql: string = `
        SELECT
            Center.*,
            NexusLevelCenter.level
        FROM
            NexusLevelCenter
                LEFT JOIN Center ON
                    NexusLevelCenter.center = Center.id`;
    eta.db.query(sql, [], (err: eta.DBError, rows: any[]) => {
        levelCenters = {};
        if (err) {
            eta.logger.dbError(err);
            return;
        }
        for (let i: number = 0; i < rows.length; i++) {
            levelCenters[rows[i].level] = eta.object.copy(rows[i]);
        }
    });
}

export function getCenterFromLevel(level: number): eta.Center {
    return eta.object.copy(levelCenters[level]);
}

export function checkPerson(nexusPerson: nexus.Person, callback: (person: eta.Person) => void): void {
    eta.person.getByUsername(nexusPerson.casUsername, (person: eta.Person) => {
        if (person) {
            callback(person);
            return;
        }
        // need to insert a non-IU
        let username: string = nexusPerson.casUsername ? nexusPerson.casUsername : "";
        eta.person.insertNonIU(username, nexusPerson.email, nexusPerson.firstName, nexusPerson.lastName, (id: string) => {
            if (!id) {
                callback(null);
            } else {
                callback({
                    "firstName": nexusPerson.firstName,
                    "lastName": nexusPerson.lastName,
                    "email": nexusPerson.email,
                    "username": username,
                    "id": id
                });
            }
        });
    });
}

export function getVisits(start: Date, end: Date, callback: (visits: nexus.Visit[]) => void): void {
    getEndpoint("GetStats", {
        "start": Math.floor(start.getTime() / 1000),
        "end": Math.floor(end.getTime() / 1000)
    }, (rawVisits: any) => {
        if (rawVisits == null) {
            callback(null);
            return;
        }
        let visits: nexus.Visit[] = [];
        for (let i: number = 0; i < rawVisits.length; i++) {
            let raw: any = rawVisits[i];
            visits.push({
                "start": new Date(raw.StartTime),
                "end": new Date(raw.EndTime),
                "username": raw.Username,
                "email": raw.Email,
                "firstName": raw.FirstName,
                "lastName": raw.LastName,
                "mathLevel": raw.MathLevelId,
                "casUsername": raw.CasId,
                "objective": raw.Objective,
                "id": raw.PersonId,
                "instance": raw.InstanceId
            });
        }
        callback(visits);
    });
}

function getEndpoint(url: string, params: { [key: string]: string | number }, callback: (data: any) => void): void {
    params["apiKey"] = eta.config.nexus.api.key;
    url = eta.config.nexus.api.url + url;
    eta.http.request(url, "GET", params, true, (code: number, response: string) => {
        if (code != 200) {
            eta.logger.trace("Url " + url + " returned code " + code);
            eta.logger.json(params);
            callback(null);
            return;
        }
        let data: any;
        try {
            data = JSON.parse(response);
        } catch (ex) {
            callback(null);
            return;
        }
        callback(data);
    }, true);
}
