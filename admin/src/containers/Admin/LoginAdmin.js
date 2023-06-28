import React, { useState } from "react";
import { LogoNav, imgLogin } from "../../assets/images";
import { path } from "../../utils/constant";
import { apiLoginAdmin } from "../../services";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validate_data } from "../../utils/validate_data";
import actionTypes from "../../store/actions/actionTypes";
import { loginAdmin } from "../../store/actions";
import InputRegister from "./InputRegister";

const LoginAdmin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, seterrors] = useState("");
    const [payload, setpayload] = useState(() => {
        const init = {
            phone1: "",
            password: "",
        };
        return init;
    });

    const handleSubmitLogin = async () => {
        let count = validate_data(payload, seterrors);
        if (count !== 0) {
            Swal.fire("Lỗi!", "Đăng nhập không thành công!", "error");
        } else {
            try {
                const response = await apiLoginAdmin(payload);
                if (response.data.success === true) {
                    dispatch(loginAdmin(response));
                    Swal.fire("Thành công!", response.data.message, "success");
                    navigate(`/`);
                } else {
                    Swal.fire("Lỗi!", response?.data?.message, "error");
                    navigate(`/${path.LOGIN_ADMIN}`);
                    dispatch({
                        type: actionTypes.LOGIN_FAIL,
                        message: response.data.message,
                    });
                }
            } catch (error) {
                Swal.fire("Lỗi!", error?.response?.data?.message, "error");
            }
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="bg-[#ccc6fd]">
                <div className="justify-center pt-[150px] pb-[290px] border-top flex">
                    <div className="border-[1px] border-black border-solid">
                        <img
                            src={imgLogin}
                            aria-label="Img Login"
                            width="450"
                            height="100%"
                        ></img>
                    </div>
                    <div className="flex flex-col border-[1px] border-black border-solid bg-white w-[30%] items-center">
                        <div className="flex flex-col mt-5 justify-center items-center gap-2">
                            <div className="brand-logo">
                                <img src={LogoNav} alt="logo"></img>
                            </div>
                            <div className="flex text-xl">
                                Start<p className="text-blue-500">Admin</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-[60%] mt-4">
                            <InputRegister
                                text="Số điện thoại"
                                placeholder="Nhập số điện thoại"
                                name="phone1"
                                value={payload?.phone1}
                                setValue={setpayload}
                                errors={errors}
                                seterrors={seterrors}
                            />
                            <InputRegister
                                text="Mật khẩu"
                                placeholder="*********"
                                name="password"
                                value={payload?.password}
                                setValue={setpayload}
                                errors={errors}
                                seterrors={seterrors}
                                password
                            />
                        </div>
                        <div className="flex items-center justify-center mt-10 mb-3 w-[60%]">
                            <button
                                className="bg-[#044890] py-1 w-full text-white rounded-[15px] font-['Irish_Grover'] text-xl cursor-pointer hover:font-bold hover:bg-blue-400"
                                type="submit"
                                onClick={() => handleSubmitLogin()}
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <div className="text-center text-sm">
                            <a
                                href={`/${path.RESET_PASSWORD}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-cyan-500"
                            >
                                Quên mật khẩu?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
