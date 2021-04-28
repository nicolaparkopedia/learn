import {writable} from "svelte/store";
import moment from "moment"

export default class Log {

    // Initialise with values from the local storage, if any.
    static logEntries = writable(JSON.parse(localStorage.getItem("logEntries")) || []);

    static add(message) {
        Log.logEntries.update(operation => {

            var logEntry = {
                "time": moment().toISOString(),
                "message": message
            };

            return [...operation, logEntry];
        });
    }
}

// Persist the log in the local storage.
Log.logEntries.subscribe(val => localStorage.setItem("logEntries", JSON.stringify(val)));

