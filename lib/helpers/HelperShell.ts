import * as childProcess from "child_process";

export class HelperShell {
    public static run(command: string, callback: (err: Error, stdout?: string, stderr?: string) => void, stdin?: string): void {
        if (!stdin) {
            stdin = "";
        }
        childProcess.exec(command, callback).stdin.write(stdin);
    }
}
