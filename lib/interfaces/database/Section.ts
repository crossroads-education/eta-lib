import * as eta from "../../../index";

export interface Section {
    /**
    unique id of the section
    */
    id : number;

    /**
    What type of course the Section is, (less specific, think square -> rectangle)
    */
    course : eta.Course;

    active : boolean;

    /**
    where its happening
    */

    room : string;

    /**
    the maximum number of people
    */

    maximumEnrollment : number;

    /**
    current enrolled students
    */

    totalEnrollment : number;

    /**
    how many credit hours the class is
    */

    creditHours : number;

    /**
    what the section number is
    */

    sectionNumber : string;

    /**
    term (spring, fall, summer 1/2)
    */

    term : eta.Term;

    /**
    subject code
    */

    subject : string;

    number : string;

    meetingType : string;
}
