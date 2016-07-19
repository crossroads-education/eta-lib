interface DatabaseConnectionInfo {
    host : string;
    port : number;
    user : string;
    password : string;
    database : string;
}

export interface Configuration {
    cas : {
        service : string;
        url : string;
    };
    db : DatabaseConnectionInfo;
    dev : {
        use : boolean;
    };
    email : string;
    http : {
        port : number;
        secret : string;
        ssl : {
            ca : string;
            cert : string;
            key : string;
            port : number;
            use : boolean;
        };
    };
    mail : {
        host : string;
        port : number;
        secure : boolean;
    };
}
