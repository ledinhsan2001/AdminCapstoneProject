import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import { validate_data } from "../../utils/validate_data";
import { mdi_user } from "../../assets/images";
import { apiAddAdmin } from "../../services";
import { InputInfor } from "../components";

const AddAdmin = ({ setisShowAdmin }) => {
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const [errors, seterrors] = useState([]);
    const [payload, setpayload] = useState({
        avt: "",
        first_name: "",
        last_name: "",
        phone_admin: "",
        email_admin: "",
        password: "",
    });

    const handleSubmit = async () => {
        let count = validate_data(payload, seterrors);
        if (count !== 0) {
            Swal.fire("Lỗi!", "Tạo tài khoản có lỗi!", "error");
        } else {
            const response = await apiAddAdmin(payload);
            if (response.data.success === true) {
                Swal.fire("Thành công!", response.data.message, "success");
            } else {
                Swal.fire("Lỗi!", response.data.message, "error");
            }
        }
    };

    const handleUploadImages = async (e) => {
        e.stopPropagation();
        setisLoading(true);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Tải ảnh thành công",
                showConfirmButton: false,
                timer: 2000,
            });
            setpayload((prev) => ({ ...prev, avt: reader.result }));
        };
        reader.onerror = (error) => {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: error,
                showConfirmButton: false,
                timer: 2000,
            });
        };
        setisLoading(false);
    };

    return (
        <div
            className="absolute top-0 bottom-0 right-0 left-0 bg-overlay-70 overflow-y-auto justify-center"
            onClick={(e) => {
                e.stopPropagation();
                setisShowAdmin(false);
            }}
        >
            <div
                className="flex"
                onClick={(e) => {
                    e.stopPropagation();
                    setisShowAdmin(false);
                }}
            >
                <div
                    className="pt-5 w-full pb-[200px]"
                    onClick={(e) => {
                        e.stopPropagation();
                        setisShowAdmin(false);
                    }}
                >
                    <div className="flex justify-center w-full">
                        <div className="pt-4">
                            <div className="text-left text-white font-bold text-4xl pb-4">
                                Tạo tài khoản admin
                            </div>
                            <div
                                className="flex flex-col h-[820px] px-[10%] bg-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setisShowAdmin(true);
                                }}
                            >
                                <div className="pt-4">
                                    <div className="flex mt-4 items-center">
                                        <div className="text-lg font-bold">
                                            Hình đại diện
                                        </div>
                                        <div className="flex flex-col ml-[80px]">
                                            <div className="flex rounded-full bg-[#D9D9D9] items-center justify-center hover:text-gray-600 h-[140px] w-[140px] mb-2 relative">
                                                <img
                                                    src={
                                                        payload?.avt || mdi_user
                                                    }
                                                    alt="mdi_user"
                                                    className="h-[130px] w-[130px] rounded-full"
                                                ></img>
                                            </div>
                                            <input
                                                id="image"
                                                hidden
                                                type="file"
                                                onChange={handleUploadImages}
                                            />
                                            {isLoading ? (
                                                <div className="flex absolute ml-[25px] top-36 mt-[10px]">
                                                    <RotatingLines
                                                        strokeColor="grey"
                                                        strokeWidth="5"
                                                        animationDuration="0.75"
                                                        width="86"
                                                        visible={true}
                                                    />
                                                </div>
                                            ) : (
                                                <label
                                                    className="text-lg justify-center items-center cursor-pointer text-md mt-2  hover:text-blue-400"
                                                    htmlFor="image"
                                                >
                                                    <u>Chọn ảnh khác</u>
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                    {/*  */}
                                    <InputInfor
                                        text="Số điện thoại"
                                        value={payload?.phone_admin || ""}
                                        setValue={setpayload}
                                        name="phone_admin"
                                        errors={errors}
                                        seterrors={seterrors}
                                    />
                                    {/*  */}
                                    <InputInfor
                                        text="Họ Tên"
                                        value={payload?.first_name || ""}
                                        value1={payload?.last_name || ""}
                                        setValue={setpayload}
                                        double
                                        name="first_name"
                                        name1="last_name"
                                        errors={errors}
                                        seterrors={seterrors}
                                    />
                                    {/*  */}
                                    <InputInfor
                                        text="Email"
                                        value={payload?.email_admin || ""}
                                        setValue={setpayload}
                                        name="email_admin"
                                        errors={errors}
                                        seterrors={seterrors}
                                    />
                                    {/*  */}
                                    <InputInfor
                                        text="Mật khẩu"
                                        value={payload?.password || ""}
                                        setValue={setpayload}
                                        name="password"
                                        errors={errors}
                                        seterrors={seterrors}
                                        password
                                    />
                                    {/*  */}
                                    <div className="flex justify-center items-center p-2 mt-10 rounded-xl bg-[#2957cc] cursor-pointer text-white mx-[5%] hover:bg-blue-400">
                                        <button
                                            type="button"
                                            className="flex text-lg justify-center items-center gap-1 w-full"
                                            onClick={() => {
                                                handleSubmit();
                                            }}
                                        >
                                            {"Tạo"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(AddAdmin);
