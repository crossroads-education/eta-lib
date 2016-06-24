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
    http : {
        port : number;
        secret : string;
    };
}
