import moment from "moment";
import "moment/locale/vi";

export const FormatDate = (number_day) => {
    let data = new Date();
    let date_moment;
    if (number_day) {
        date_moment = moment(data).add(number_day, "d");
    } else {
        date_moment = moment(data);
    }
    let day = date_moment.day();
    day = day === 0 ? "Chủ nhật" : `Thứ ${day + 1}`;
    let date = date_moment.date();
    let month = date_moment.month() + 1;
    let year = date_moment.year();
    let get_minute = date_moment.minute();
    let minute = +get_minute < 10 ? `0${get_minute}` : get_minute;
    let hour = date_moment.hour();
    return `${day}, ${hour}:${minute} ${date}/${month}/${year}`;
};
