import * as eta from "../../../index";

export class HelperHours {
    public static hours : {[key : number] : eta.Schedule[]};
    private static days : string[];

    private static copySpan(span : eta.TimeSpan) : eta.TimeSpan {
        return {
            "start": new Date(span.start.getTime()),
            "end": new Date(span.end.getTime())
        }
    }

    public static init() : void {
        HelperHours.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        HelperHours.hours = {};
        var sql : string = "SELECT * FROM HoursOfOperation";
        eta.db.query(sql, [], (err : eta.DBError, rows : any[]) => {
            if (err) {
                eta.logger.dbError(err);
                return;
            }
            for (var i in rows) {
                var term : number = rows[i]["term"];
                if (!HelperHours.hours[term]) {
                    HelperHours.hours[term] = [];
                }
                if (rows[i]["open"] == "00:00:00" || rows[i]["close"] == "00:00:00") {
                    continue;
                }
                HelperHours.hours[term].push({
                    "location": rows[i]["location"],
                    "day": rows[i]["day"],
                    "dayName": HelperHours.days[rows[i]["day"]],
                    "start": new Date(new Date().toLocaleDateString() + " " + rows[i]["open"]),
                    "end": new Date(new Date().toLocaleDateString() + " " + rows[i]["close"]),
                    "term": term
                });
            }
        });
    }

    public static getLongestOpen(schedules : {[key : string] : eta.Schedule}) : eta.Schedule {
        var longest : string = "";
        for (var i in schedules) {
            if (longest === "") {
                longest = i;
                continue;
            }
            var span1 : number = schedules[i].end.getTime() - schedules[i].start.getTime();
            var span2 : number = schedules[longest].end.getTime() - schedules[longest].start.getTime();
            if (span1 > span2) {
                longest = i;
            }
        }
        return eta.object.copy(schedules[longest]);
    }

    public static getLongestSpan(schedules : {[key : string] : eta.Schedule}) : eta.TimeSpan {
        var span : eta.TimeSpan = {
            "start": null,
            "end": null
        };
        for (var i in schedules) {
            if (span.start == null) { // because HelperHours.implies end is null too
                span.start = schedules[i].start;
                span.end = schedules[i].end;
                continue;
            }
            if (schedules[i].start.getTime() < span.start.getTime()) {
                span.start = schedules[i].start;
            }
            if (schedules[i].end.getTime() > span.end.getTime()) {
                span.end = schedules[i].end;
            }
        }
        return HelperHours.copySpan(span);
    }

    public static getForLocation(term : string, location : string) : {[key : string] : eta.Schedule} {
        if (!HelperHours.hours[term]) {
            return null;
        }
        var ret : {[key : string] : eta.Schedule} = {};
        for (var i in HelperHours.hours[term]) {
            var hours = HelperHours.hours[term][i];
            if (hours.location != location) {
                continue;
            }
            ret[hours.day] = hours;
        }
        return ret;
    }

    public static getForDay(term : string, day : number) : {[key : string] : eta.Schedule} {
        if (!HelperHours.hours[term]) {
            return null;
        }
        var ret : {[key : string] : eta.Schedule} = {};
        for (var i in HelperHours.hours[term]) {
            var dayHours : eta.Schedule = HelperHours.hours[term][i];
            if (dayHours.day == day) {
                ret[dayHours.location] = dayHours;
            }
        }
        return ret;
    }
}
