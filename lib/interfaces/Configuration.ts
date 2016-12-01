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
}
