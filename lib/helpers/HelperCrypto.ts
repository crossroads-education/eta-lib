import * as eta from "../../index";

import * as crypto from "crypto";

export class HelperCrypto {

    public static cryptAlgorithm: string = "aes-256-ctr";

    public static generateSalt(): string {
        return crypto.randomBytes(24).toString("hex");
    }

    public static hash(password: string, salt: string): string {
        let hash: crypto.Hash = crypto.createHash("sha256");
        hash.update(password + salt);
        return hash.digest("hex");
    }

    public static encrypt(text: string, password: string): string {
        let cipher: crypto.Cipher = crypto.createCipher(HelperCrypto.cryptAlgorithm, password);
        let encrypted: string = cipher.update(text, "utf8", "hex");
        return encrypted + cipher.final("hex");
    }

    public static decrypt(text: string, password: string): string {
        let decipher: crypto.Decipher = crypto.createDecipher(HelperCrypto.cryptAlgorithm, password);
        let decrypted: string = decipher.update(text, "hex", "utf8");
        return decrypted + decipher.final("utf8");
    }
}
