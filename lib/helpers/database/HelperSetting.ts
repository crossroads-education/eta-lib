import * as eta from "../../../index";

export class HelperSetting {
    public static settings: { [key: string]: eta.Setting[] };
    public static init(): void {
        HelperSetting.settings = {};
        eta.db.query("SELECT * FROM Setting", [], (err: Error, result: eta.QueryResult) => {
            if (err) {
                eta.logger.error(err);
                return;
            }
            for (let i: number = 0; i < result.rows.length; i++) {
                if (!HelperSetting.settings[result.rows[i].page]) {
                    HelperSetting.settings[result.rows[i].page] = [];
                }
                HelperSetting.settings[result.rows[i].page].push(result.rows[i]);
            }
        });
    }

    public static get(page: string, name: string): eta.Setting {
        if (!HelperSetting.settings[page]) {
            eta.logger.trace("Settings for " + page + " do not exist. (" + name + ")");
            return null;
        }
        for (let i: number = 0; i < HelperSetting.settings[page].length; i++) {
            if (HelperSetting.settings[page][i].name == name) {
                return HelperSetting.settings[page][i];
            }
        }
        return null;
    }

    public static getForPage(page: string): eta.Setting[] {
        return HelperSetting.settings[page];
    }

    public static set(page: string, name: string, value: string, type: string, callback: (err: Error) => void): void {
        let sql: string = `
            INSERT INTO Setting (page, name, value, type)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                value = VALUES(value),
                type = VALUES(type)`;
        eta.db.query(sql, [page, name, value, type], (err: Error, result: eta.QueryResult) => {
            callback(err);
        });
    }
}
