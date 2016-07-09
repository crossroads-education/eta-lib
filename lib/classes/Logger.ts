import "../autoload";

import * as fs from "fs";
import * as mysql from "mysql";
import * as stackTrace from "stack-trace";

export class Logger {
    private root : string;

    public constructor(root : string) {
        this.root = root;
        try {
            fs.accessSync(this.root + "/logs");
        } catch (ex) {
            fs.mkdirSync(this.root + "/logs");
        }
    }

    private getCalling() : string {
        let stack : stackTrace.StackFrame = stackTrace.get()[3];
        return stack.getFileName().substring(this.root.length).replace(/\\/g, "/") + ":" + stack.getLineNumber();
    }

    private log(data : string) : void {
        let now : Date = new Date();
        let filename : string = this.root + "/logs/" + now.toLocaleDateString().replace(/\//g, "-") + ".log";
        let msg : string = `(${now.toLocaleTimeString()}) [${this.getCalling()}] ${data}`;
        console.log(msg);
        fs.appendFile(filename, msg + "\n");
    }

    public dbError(err : mysql.IError) : void {
        this.log(`[DBERR] (${err.code}) ${err.message}`);
    }

    public json(obj : any) : void {
        this.log(`[JSON] ${JSON.stringify(obj)}`);
    }

    public error(msg : string) : void {
        this.log(`[ERROR] ${msg}`);
    }

    public warn(msg : string) : void {
        this.log(`[WARN] ${msg}`);
    }

    public info(msg : string) : void {
        this.log(`[INFO] ${msg}`);
    }

    public trace(msg : string) : void {
        this.log(`[TRACE] ${msg}`);
    }
}
