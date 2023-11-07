
import moment from "moment-timezone";


interface TimeData {
    time: string;
    meridiem: string;
    dayAndDate: string;
}

export const getWeather = (timeZoneData: string, setTimeData: (data: TimeData) => void) => {

    const timeZone = timeZoneData

    // Convert the epoch time to a specific time format in the given timezone
    const formattedTime = moment.tz(timeZone).format('hh:mm A');
    // Get the day of the week and date in the desired format
    const dayAndDate = moment.tz(timeZone).format('dddd, DD MMM');

    // Extract the time in "hh:mm" and "am" or "pm" separately
    const [time, amOrPm] = formattedTime.split(' ');

    setTimeData({
        time: time,
        meridiem: amOrPm.toLocaleLowerCase(),
        dayAndDate: dayAndDate
    })
}




export const getDayfromDate = (date: string) => {
    const inputDate = date;
    const inputTimezone = 'UTC'; // Change this to your preferred timezone

    // Parse the input date and set the desired output format
    const formattedDate = moment.tz(inputDate, inputTimezone).format('dddd, DD MMM');
    return formattedDate
}

export const getTimefromDate = (date: string) => {
    const inputDate = date
    const formattedDate = moment(inputDate).format('dddd, DD MMM - hh:mm A');

    return formattedDate
}