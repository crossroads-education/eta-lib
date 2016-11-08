import * as eta from "../../../index";

export interface Section {
    /**
    Unique numeric ID
    Built by concatenating Term.term and Section.number
    */
    id: number;

    /**
    What type of course the Section is
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
    maximumEnrolled: number;

    /**
    Students currently enrolled
    */
    totalEnrolled: number;

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

    /**
    The user ID of the professor (correlates to Person.id)
    */
    professor: string;

    /**
    Sum of hours visited for this section
    */
    visitDuration: number;

    /**
    Count of visits for this section
    */
    visitCount: number;
}
