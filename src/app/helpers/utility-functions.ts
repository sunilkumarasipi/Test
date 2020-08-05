export class Utility {

    static getCurrentDateTime() {
        let today = new Date();
        let hoursDiff = today.getHours() - today.getTimezoneOffset() / 60;
        let minutesDiff = (today.getHours() - today.getTimezoneOffset()) % 60;
        today.setHours(hoursDiff);
        today.setMinutes(minutesDiff);
        return JSON.parse(JSON.stringify(today));
    };

    static convertDateToJsonDate(date: Date) {
        let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
        let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
        date.setHours(hoursDiff);
        date.setMinutes(minutesDiff);
        return JSON.parse(JSON.stringify(date));
    }

    static convertJsonDateToNgbDate(dt: Date) {
        let date = new Date(dt);
        console.log(dt);
        let ngbDateStruct = { day: date.getUTCDate() + 1, month: date.getUTCMonth() + 1, year: date.getUTCFullYear() };
        return ngbDateStruct;
    }

    static convertNgbDateToJsonDate(dt: any) {
        let date = new Date(dt.year, dt.month - 1, dt.day);
        return this.convertDateToJsonDate(date);
    }

}


