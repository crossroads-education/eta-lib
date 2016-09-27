export class PermissionUser {
    public permissions: string[];
    public constructor(permissions: string[]) {
        this.permissions = permissions;
    }

    public has(permission: string): boolean {
        let permTokens: string[] = permission.split("/");
        for (let i: number = 0; i < this.permissions.length; i++) {
            let testTokens: string[] = this.permissions[i].split("/");
            let length: number = testTokens.length > permTokens.length ? testTokens.length : permTokens.length;
            for (let k: number = 0; k < length; k++) {
                if (permTokens.length <= k || testTokens.length <= k) {
                    break; // not gonna happen
                }
                if (testTokens[k] == "*") { // wildcard = definite yes
                    return true;
                }
                if (testTokens[k] == permTokens[k]) { // possible match
                    if (k == length - 1) { // last element
                        return true;
                    }
                    // don't stop, could still match since it has up till now
                } else { // definite mismatch
                    break;
                }
            }
        }
        // nothing was found
        return false;
    }
}
