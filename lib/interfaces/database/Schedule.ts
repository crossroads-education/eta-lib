import { TimeSpan } from "../TimeSpan";

/**
Correlates with HoursOfOperation table.
Not to be confused with EmployeeSchedule, this is for hours of operation.
*/
export interface Schedule extends TimeSpan {
    /**
    The center ID this schedule is for
    */
    location: number;

    /**
    The day of week this schedule covers
    Allowed values: 0 <= day <= 6
    */
    day: number;

    /**
    The name of the day of week
    */
    dayName: string;

    /**
    The term ID this schedule applies to
    */
    term: number;
}
