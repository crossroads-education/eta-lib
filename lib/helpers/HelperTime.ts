// documentation can be found at http://blog.stevenlevithan.com/archives/date-time-format
import * as dateFormat from "dateformat";

export class HelperTime {
    public static span1Hour: number = 3600000;
    public static span15Minutes: number = 900000;
    public static daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    public static shortDaysOfWeek: string[] = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    public static fillTimes(start: Date, end: Date, interval: number, format: string): string[] {
        let times: string[] = [];
        for (var i: number = start.getTime(); i <= end.getTime(); i += interval) {
            times.push(dateFormat(new Date(i), format));
        }
        return times;
    }
    public static getCurrentDayOfWeek(): number {
        return new Date().getDay();
    }

    public static getNameFromDayOfWeek(day: number): string {
        return HelperTime.daysOfWeek[day];
    }
    /**
    Format: YYYY-MM-DD (zero padded)
    */
    public static getStandardDate(date: Date): string {
        return dateFormat(date, "yyyy-mm-dd");
    }
    /**
    Format: YYYY-MM-DD HH:MM:SS
    */
    public static getStandardDatetime(date: Date): string {
        return dateFormat(date, "yyyy-mm-dd HH:MM:ss");
    }

    /**
    Returns time formatted for hours of operation
    `time` must be HH:MM:SS
    if time != noon:
        ht (1p, 11a, etc)
    else:
        Noon
    */
    public static getHoursTime(time: string): string {
        if (time == "12:00:00") {
            return "Noon";
        } else {
            let hour: number = Number(time.split(":")[0]);
            // Number("01").toString() returns "1"
            if (hour < 12) {
                return hour.toString() + "am";
            } else {
                return (hour - 12).toString() + "pm";
            }
        }
    }

    public static getShortTime(time: Date): string {
        return dateFormat(time, "h tt");
    }

    public static getMinuteTime(time: Date): string {
        return dateFormat(time, "h:mm tt");
    }

    public static getDateFromTime(time: string): Date {
        return new Date(HelperTime.getStandardDate(new Date()) + " " + time);
    }
}
