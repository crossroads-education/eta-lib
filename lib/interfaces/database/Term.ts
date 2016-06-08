export interface Term {
    /**
    The term ID.
    IU convention: https://www.iusb.edu/registrar/termcodes.php
    */
    id : string;

    /**
    Session (usually 1, but could be SS1/2, for summer)
    */
    session : string;

    /**
    The start of this term.
    */
    start : Date;

    /**
    The day this term ends.
    */
    end : Date;

    /**
    The name of the term (like Summer 2016, etc)
    */
    name : string;
}
