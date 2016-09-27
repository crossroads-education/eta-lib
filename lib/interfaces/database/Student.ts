import * as eta from "../../../index";

export interface Student {

    /**
    The courses the student is currently enrolled in
    */
    sections: eta.Section[];

    /**
    Unique numeric id for the student
    */
    id: string;
}
