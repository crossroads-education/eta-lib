import * as eta from "../../../index";

export interface Employee extends eta.Person {
    /**
    The employee's non-university email, for alternate contact
    */
    altEmail : string;

    /**
    The name they prefer on their nametag
    */
    badgeName : string;

    /**
    The biography that will be shown on the staff directory
    */
    biography : string;

    /**
    Whether the employee is currently employed
    */
    current : boolean;

    /**
    Their emergency contact's name
    */
    emergencyName : string;

    /**
    Their emergency contact's phone number
    */
    emergencyPhone : string;

    /**
    Their relationship to their emergency contact
    */
    emergencyRelationship : string;

    /**
    Whether they are an international student
    */
    isInternational : boolean;

    /**
    The maximum number of hours they prefer to work per week
    */
    maxHours : number;

    /**
    The minimum number of hours they prefer to work per week
    */
    minHours : number;

    /**
    Their notes on their schedule and availability
    */
    notes : string;

    /**
    Their phone number
    */
    phone : string;

    /**
    Their shirt size
    */
    shirt : string;
}
