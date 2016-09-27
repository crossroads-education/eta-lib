import "../autoload";

import * as fs from "fs";

export class HelperFS {

    /**
    Provides functionality of deprecated fs.exists()
    See https://github.com/nodejs/node/issues/1592
    */
    public static exists(filename: string, callback: (exists: boolean) => void): void {
        fs.access(filename, (err: NodeJS.ErrnoException) => {
            callback(!err);
        });
    }

    /**
    Provides functionality of deprecated fs.existsSync()
    See https://github.com/nodejs/node/issues/1592
    */
    public static existsSync(filename: string): boolean {
        try {
            fs.accessSync(filename);
        } catch (ex) {
            return false;
        }
        return true;
    }
}
