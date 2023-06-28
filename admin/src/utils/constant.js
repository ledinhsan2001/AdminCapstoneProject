export const path = {
    RESET_PASSWORD: "quen-mat-khau",

    HOME_ADMIN: "/*",
    LOGIN_ADMIN: "dang-nhap",
    ACCOUNT_MANAGE: "quan-ly-tai-khoan",
    STATISTICAL_POST: "thong-ke-tin-dang",
    STATISTICAL_MONEY: "thong-ke-thu-nhap",
    HISTORY_LIST: "danh-sach-lich-su",
    BLOG_MANAGEMENT: "quan-ly-blog",
    BLOG_DETAIL__ID: "blog/chi-tiet/:id",
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

// create Post
export const FormatGetNummber = (string) => {
    string = string.toString();
    let number = +string?.match(/\d+/);
    if (number) {
        return number;
    }
};
