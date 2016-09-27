/**
A slot of time representing an employee's availabilty and schedule.
*/
export interface EmployeeSchedule {
    /**
    Whether the employee is available to be scheduled or not.
    No correlation with isScheduled (can be scheduled without being available).
    */
    isAvailable: boolean;

    /**
    The center ID the employee is scheduled to work at during this slot.
    */
    center: number;

    /**
    The time this slot covers (24-hour format) (15-minute intervals)
    Example: 15:30:00
    */
    time: string;

    /**
    The day of the week this slot is in.
    Allowed values: 0 <= day <= 6
    */
    day: number;

    /**
    Whether the employee is scheduled or not.
    No correlation with isAvailable (can be scheduled without being available)
    */
    isScheduled: boolean;

    /**
    The term ID this slot covers.
    */
    term: number;
}
