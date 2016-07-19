// documentation can be found at http://blog.stevenlevithan.com/archives/date-time-format
import * as dateFormat from "dateformat";

export class HelperTime {
    public static span1Hour : number = 3600000;
    public static span15Minutes : number = 900000;
    public static daysOfWeek : string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    public static fillTimes(start : Date, end : Date, interval : number, format : string) : string[] {
        let times : string[] = [];
        for (var i : number = start.getTime(); i <= end.getTime(); i += interval) {
            times.push(dateFormat(new Date(i), format));
        }
        return times;
    }
    public static getCurrentDayOfWeek() : number {
        return new Date().getDay();
    }
    public static getNameFromDayOfWeek(day : number) : string {
        return HelperTime.daysOfWeek[day];
    }
    /**
    Format: YYYY-MM-DD (zero padded)
    */
    public static getStandardDate(date : Date) : string {
        return dateFormat(date, "yyyy-mm-dd");
    }
    /**
    Format: YYYY-MM-DD HH:MM:SS
    */
    public static getStandardDatetime(date : Date) : string {
        return dateFormat(date, "yyyy-mm-dd HH:MM:ss");
    }
}