import * as eta from "../../../index";

export interface Section {
    /**
    Unique numeric ID. NOT section number.
    */
    id: number;

    /**
    What type of course the Section is, (less specific, think square -> rectangle)
    */
    course: eta.Course;

    /**
    Not incredibly sure what this signifies, but it's in IU's database for some reason.
    */
    active: boolean;

    /**
    The location of the class.
    */
    room: string;

    /**
    The max number of people enrolled
    */
    maximumEnrollment: number;

    /**
    Students currently enrolled
    */
    totalEnrollment: number;

    /**
    Credit hours
    */
    creditHours: number;

    /**
    Section number
    */
    number: string;

    /**
    Term the section was in
    */
    term: eta.Term;

    /**
    Should be WEB or LEC.
    */
    meetingType: string;

    professor: string;
}
