import * as eta from "../../../index";

import * as soap from "soap";

export class HelperWizIQ {

    private static soapUrl: string = "http://authorlive.com/aGLIVE/aGLive.asmx?WSDL";

    /**
    Schedules a room for WizIQ.
    Schema for response is http://authorlive.com/aGLIVE/aGLive.asmx?op=ScheduleNewEvent
    */
    public static schedule(start: Date, end: Date, roomLetter: string, callback: (err: Error, result?: any) => void): void {
        // duration is in minutes (.getTime() returns milliseconds)
        let duration: number = Math.round((end.getTime() - start.getTime()) / (60 * 1000));
        let params: any = {
            "EventDetails": {
                "UserName": eta.config.wiziq.username,
                "Password": eta.config.wiziq.password,
                "EventName": "Room " + roomLetter,
                "DateTime": eta.time.getAmericanDatetime(start),
                "Duration": duration,
                // I can't find any documentation for the properties below.
                // All of these properties are unmodified from the original WizIQ script in the legacy codebase.
                // I've attempted to clarify properties/values where possible.
                // When numbers are represented as strings, it is intentional. (i.e., "1" instead of 1)
                "TimeZone": 67, // Believe this means EST
                "MaxUsers": 4, // Not sure this affects anything (have seen 8 users in 1 room before)
                "VideoSize": "NotSet", // Believe this disables video for the room
                "AttendeeList": "", // Not sure of formatting
                "ShowTimer": true, // Show "Time Left" text on room
                "EnablePrivateChat": "yes", // Intentionally "yes" instead of true or "1"
                "BrowserCloseMsg": "enTrue", // Whether the exit confirmation dialog should be shown or not
                "AttendeeContent": "enFalse", // Believe this controls whether attendees can write on whiteboard
                // Yes, these are different than "TimeZone". No, I don't know why.
                "PresenterTimeZone": 33,
                "AttendeeTimeZone": 33,
                // The following properties have fairly obvious names / purposes
                "ChatAlertSound": false,
                "ShowEraser": "enFalse",
                "MathToolBar": "enTrue",
                "AudioQuality": 2, // Not sure what the value means, since we don't use audio.
                "CompanyName": "MAC", // Not sure where this is used by WizIQ
                "PresenterLabel": "Tutor", // See "CompanyName"
                "CompanyURL": "https://mac.iupui.edu",
                "ShowConnStatus": false,
                "ShowDisableChatButton": false,
                "SecureLogin": true,
                // The following properties are intentionally left empty
                "Description": "",
                "PresenterFeedbackURL": "",
                "AttendeeFeedbackURL": "",
                "SupportURL": "",
                // I don't know what any of these are for. They could be important(?)
                "UserCode": "flex",
                "CategoryNumber": 4,
                "IsExtendableByMins": true,
                "ExtendedMins": 1,
                "TimerType": "false",
                "PingTime": 1,
                "RecodingReplay": true, // Intentionally "Recoding", not "Recording"
                // "DefaultTab": "P",
                "PrintRequired": false,
                "DisplayAttendeeLoginLogout": "enDisplay",
                "EndSessionRequired": "enTrue",
                "VideoSharing": true,
                "SmileysRequired": true
            }
        };
        soap.createClient(HelperWizIQ.soapUrl, {}, (err: Error, client: any) => {
            if (err) {
                return callback(err);
            }
            client.ScheduleNewEvent(params, (err: Error, result: any, requestXML: string) => {
                if (err) {
                    eta.logger.trace(requestXML);
                    return callback(err);
                }
                return callback(null, result.ScheduleNewEventResult);
            });
        });
    }
}
