import React, { memo } from "react";
import { mdi_user } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { apiPutUser } from "../../services";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import * as actions from "../../store/actions";
import { validate_data } from "../../utils/validate_data";
import { SideBarMain } from ".";
import ChangePass from "./ChangePass";
import { InputInfor } from "../components";

const AccountManage = () => {
    const dispatch = useDispatch();
    const { user_data } = useSelector((state) => state.user);
    const [isLoading, setisLoading] = useState(false);
    const [showChangePass, setshowChangePass] = useState(false);
    const [errors, seterrors] = useState([]);
    const [payload, setpayload] = useState({
        avt: user_data?.avt || "",
        first_name: user_data?.first_name || "",
        last_name: user_data?.last_name || "",
        email: user_data?.email || "",
        address: user_data?.address || "",
    });

    const handleSubmit = async () => {
        let count = validate_data(payload, seterrors);
        if (count !== 0) {
            Swal.fire("Lỗi!", "Cập nhật thông tin không thành công!", "error");
        } else {
            const response = await apiPutUser(payload);
            if (response.status === 200) {
                Swal.fire("Thành công!", response.data.message, "success");
                dispatch(actions.actionUser());
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

    const handleChangepass = () => {
        setshowChangePass(true);
    };

    return (
        <div className="flex">
            <SideBarMain />
            <div className="pt-5 w-full bg-[#F5F5F5]">
                <div className="flex justify-center w-full">
                    <div className="pt-4">
                        <div className="text-left text-black font-bold text-4xl pb-4">
                            Thông tin cá nhân
                        </div>
                        <div className="flex flex-col h-[820px] px-[10%] bg-white">
                            <div className="pt-4">
                                <div className="flex mt-4 items-center">
                                    <p className="text-lg font-bold">
                                        Hình đại diện
                                    </p>
                                    <div className="flex flex-col ml-[100px]">
                                        <div className="flex rounded-full bg-[#D9D9D9] items-center justify-center hover:text-gray-600 h-[140px] w-[140px] mb-2 relative">
                                            <img
                                                src={payload?.avt || mdi_user}
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
                                    visible
                                    value={user_data?.phone || ""}
                                    setValue={setpayload}
                                    name="phone"
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
                                    value={payload?.email || ""}
                                    setValue={setpayload}
                                    name="email"
                                />
                                {/*  */}
                                <InputInfor
                                    text="Địa chỉ"
                                    value={payload?.address || ""}
                                    setValue={setpayload}
                                    name="address"
                                />
                                {/*  */}
                                <div className="flex mt-4 items-center w-full">
                                    <p className="text-lg text-start font-bold pr-[70px] whitespace-nowrap w-[25%] mr-4">
                                        Mật khẩu
                                    </p>
                                    <div className="flex flex-col w-[80%]">
                                        <p className="text-start text-lg mt-2 mx-2 text-blue-700">
                                            <i
                                                className="cursor-pointer hover:text-blue-400"
                                                onClick={() => {
                                                    handleChangepass();
                                                }}
                                            >
                                                <u>Đổi mật khẩu</u>
                                            </i>
                                        </p>
                                    </div>
                                </div>
                                {/*  */}
                                <div className="flex justify-center items-center p-2 mt-10 rounded-xl bg-[#2957cc] cursor-pointer text-white mx-[5%] hover:bg-blue-400">
                                    <button
                                        type="button"
                                        className="flex text-lg justify-center items-center gap-1 w-full"
                                        onClick={() => {
                                            handleSubmit();
                                        }}
                                    >
                                        {"Cập nhật"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {showChangePass && (
                            <ChangePass setshowChangePass={setshowChangePass} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountManage;
