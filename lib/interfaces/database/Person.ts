/**
Base interface for people.
*/
export interface Person {
    /**
    Unique student ID
    */
    id: string;

    /**
    Unique login username
    */
    username: string;

    /**
    Unique university email
    */
    email: string;

    /**
    First name
    */
    firstName: string;

    /**
    Last name
    */
    lastName: string;
}
