import * as eta from "../../../index";

export interface Section {
    course : eta.Course;
    id : number;
    active : boolean;
    room : string;
    maximumEnrollment : number;
    totalEnrollment : number;
    creditHours : number;
    sectionNumber : string;
    term : string;
    subject : string;
    number : string;
    session : string;
    meetingType : string;
}
