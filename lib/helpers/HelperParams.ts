export class HelperParams {
    public static test(body: { [key: string]: string }, params: string[]): boolean {
        for (let i: number = 0; i < params.length; i++) {
            if (body[params[i]] == undefined) {
                return false;
            }
        }
        return true;
    }
}
