export const path = {
    RESET_PASSWORD: "quen-mat-khau",

    HOME_ADMIN: "/*",
    LOGIN_ADMIN: "dang-nhap",
    ACCOUNT_MANAGE: "quan-ly-tai-khoan",
    STATISTICAL_POST: "thong-ke-tin-dang",
    STATISTICAL_MONEY: "thong-ke-thu-nhap",
    HISTORY_LIST: "danh-sach-lich-su",
};

//Mua bán bất động sản => mua-ban-bat-dong-san
export const formatUniToString = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f-,./]/g, "")
        .replace(/đ/g, "d")
        .split(" ")
        .join("-");
};

export const GetNummberFromString = (string) => {
    let number = +string.replace(/[^0-9]/g, "");
    if (number) {
        return number.toString().slice(0, 6);
    }
};

export const getNumbersPrice = (string) =>
    string.split(" ").filter((item) => +item);
export const getNumbersArea = (string) =>
    string
        .split(" ")
        .map((item) => item.match(/\d+/))
        .filter((item) => item !== null);

//Search
export const getCodePrice = (arrType) => {
    return arrType.map((item) => {
        let arr = getNumbersPrice(item.name);
        if (arr.length === 1) {
            if (+arr[0] === 1) {
                return {
                    ...item,
                    min: 0,
                    max: +arr[0],
                };
            }
            if (+arr[0] === 15) {
                return {
                    ...item,
                    min: +arr[0],
                    max: 999,
                };
            }
        } else {
            return {
                ...item,
                min: +arr[0],
                max: +arr[1],
            };
        }
    });
};

export const getCodeArea = (arrType) => {
    return arrType.map((item) => {
        let arr = getNumbersArea(item.name);
        if (arr.length === 1) {
            if (+arr[0] === 20) {
                return {
                    ...item,
                    min: 0,
                    max: +arr[0][0],
                };
            }
            if (+arr[0] === 90) {
                return {
                    ...item,
                    min: +arr[0][0],
                    max: 999,
                };
            }
        } else {
            return {
                ...item,
                min: +arr[0][0],
                max: +arr[1][0],
            };
        }
    });
};

export const getCodeRangePrice = (range_maxmin, prices) => {
    let price_maxmin = getCodePrice(prices);
    return price_maxmin.filter(
        (item) =>
            (item.min >= range_maxmin[0] && item.min < range_maxmin[1]) ||
            (item.min < range_maxmin[1] && item.max > range_maxmin[0])
    );
};
export const getCodeRangeArea = (range_maxmin, areas) => {
    let area_maxmin = getCodeArea(areas);
    return area_maxmin.filter(
        (item) =>
            (item.min >= range_maxmin[0] && item.min < range_maxmin[1]) ||
            (item.max > range_maxmin[0] && item.min < range_maxmin[1])
    );
};

// create Post
export const FormatGetNummber = (string) => {
    string = string.toString();
    let number = +string?.match(/\d+/);
    if (number) {
        return number;
    }
};
