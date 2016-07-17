import * as eta from "../../index";

describe("PermissionUser", () => {
    let subject : eta.PermissionUser;
    let perms : string[] = ["a/b", "a/b/c", "a/b/d/*", "b/c"];
    beforeEach(() => {
        subject = new eta.PermissionUser(perms);
    });

    describe(".has()", () => {
        it("Valid exact", () => {
            let result : boolean = subject.has("a/b/c");
            if (result !== true) {
                throw new Error("Expected .has('a/b/c') = true but was " + result);
            }
        });
        it("Valid wildcard", () => {
            let result : boolean = subject.has("a/b/d/x");
            if (result !== true) {
                throw new Error("Expected .has('a/b/d/x') = true but was " + result);
            }
        });
        it("Invalid child", () => {
            let result : boolean = subject.has("a/b/x");
            if (result !== false) {
                throw new Error("Expected .has('a/b/x') = false but was " + result);
            }
        });
    });
});
