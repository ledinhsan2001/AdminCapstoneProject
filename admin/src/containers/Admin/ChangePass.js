import React, { useEffect, useState } from "react";
import InputChangePass from "../components/InputChangePass";
import Swal from "sweetalert2";
import { validate_data } from "../../utils/validate_data";
import { apiChangePass } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const ChangePass = ({ setshowChangePass }) => {
    const [errors, seterrors] = useState("");
    const navigate = useNavigate();
    const [payload, setpayload] = useState(() => {
        const init = {
            oldpasswordword: "",
            newpassword: "",
            repassword: "",
        };
        return init;
    });

    const handleChangePass = async (e) => {
        e.stopPropagation();

        let count = validate_data(payload, seterrors);
        if (count !== 0) {
            Swal.fire("Lỗi!", "Cập nhật thông tin không thành công!", "error");
        } else {
            try {
                const response = await apiChangePass(payload);
                Swal.fire("Thành công!", response.data.message, "success");
                setshowChangePass(false);
                window.localStorage.clear();
                navigate("/dang-nhap");
            } catch (error) {
                Swal.fire("Lỗi!", error.response.data.message, "error");
            }
        }
    };

    return (
        <div>
            <div
                className="flex absolute top-0 bottom-0 right-0 left-0 bg-overlay-70 justify-center w-full"
                onClick={(e) => {
                    e.stopPropagation();
                    setshowChangePass(false);
                }}
            >
                <div
                    className="w-[60%] flex flex-col bg-white mt-[80px] items-center h-[500px]"
                    onClick={(e) => {
                        e.stopPropagation();
                        setshowChangePass(true);
                    }}
                >
                    <p className="font-bold text-[40px]">Đổi mật khẩu</p>
                    <div className="flex flex-col gap-2 w-full">
                        <InputChangePass
                            text="Mật khẩu cũ"
                            value={payload?.oldpassword || ""}
                            setValue={setpayload}
                            name="oldpassword"
                            errors={errors}
                            seterrors={seterrors}
                        />
                        <InputChangePass
                            text="Mật khẩu mới"
                            value={payload?.newpassword || ""}
                            setValue={setpayload}
                            name="newpassword"
                            errors={errors}
                            seterrors={seterrors}
                        />
                        <InputChangePass
                            text="Nhập lại mật khẩu mới"
                            value={payload?.repassword || ""}
                            setValue={setpayload}
                            name="repassword"
                            errors={errors}
                            seterrors={seterrors}
                        />
                    </div>
                    <div className="flex justify-around mt-4 ml-[30%]">
                        <p
                            className="py-2 px-4 my-4 mx-2 rounded-md bg-red-500 text-lg text-white hover:bg-red-300 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setshowChangePass(false);
                            }}
                        >
                            Hủy
                        </p>
                        <p
                            className="py-2 px-4 my-4 mx-2 rounded-md bg-green-500 text-lg text-white hover:bg-green-300 cursor-pointer"
                            onClick={(e) => {
                                handleChangePass(e);
                            }}
                        >
                            Cập nhật
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePass;
