/**
Represents a person as Nexus sees it, not as Eta sees it.
*/
export class Person {
    /**
    The Nexus ID of this person.
    THIS HAS NO CORRELATION WITH THE UNIVERSITY-ASSIGNED ID.
    */
    id: number;

    /**
    The CAS username.
    Not guaranteed to be the same as username.
    */
    casUsername: string;

    /**
    Email from Nexus - may not be the university email.
    */
    email: string;

    firstName: string;

    lastName: string;

    /**
    Nexus username. See casUsername for university identifier.
    Not guaranteed to be the same as email or casUsername.
    */
    username: string;

    /**
    Instance ID
    */
    instance: number;
}
