interface DatabaseConnectionInfo {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export interface Configuration {
    cas: {
        service: string;
        url: string;
    };
    crypto: {
        password: string;
    };
    db: DatabaseConnectionInfo;
    dev: {
        sudo: string;
        use: boolean;
    };
    email: string;
    http: {
        host: string;
        port: number;
        secret: string;
        ssl: {
            ca: string;
            cert: string;
            key: string;
            port: number;
            use: boolean;
            redirectPort?: number;
        };
    };
    mail: {
        host: string;
        port: number;
        secure: boolean;
    };
    nexus: {
        api: {
            key: string;
            url: string;
        };
    };
    oracle: {
        db: {
            day: {
                user: string;
                password: string;
                connectString: string;
            };
            useNight: boolean;
            night?: {
                user: string;
                password: string;
                connectString: string;
            };
        };
    };
    wiziq: {
        onlineCenter: number;
        rooms: string[];
        username: string;
        password: string;
        use: boolean;
    };
}
