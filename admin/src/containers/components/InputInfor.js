import React, { memo } from "react";
import Swal from "sweetalert2";

const InputInfor = ({
    text,
    visible,
    value,
    value1,
    setValue,
    name,
    name1,
    errors,
    seterrors,
    password,
}) => {
    const MessageErr = (name_err) => {
        let mess = errors.find((item) => item.name === name_err);
        return mess?.message;
    };
    return (
        <div className="flex mt-4 items-center w-full">
            <p
                className={
                    visible
                        ? `text-lg text-start font-bold pr-[70px] whitespace-nowrap mt-[-50px] w-[25%] mr-4`
                        : `text-lg text-start font-bold pr-[70px] whitespace-nowrap w-[25%] mr-4`
                }
            >
                {text}
            </p>
            {visible && (
                <div className="flex flex-col w-[70%]">
                    <input
                        type="text"
                        className={`flex items-center justify-between h-[50px] w-[100%] px-3 relative rounded-lg bg-gray-300 border-solid border-1 outline-none`}
                        value={value}
                        readOnly
                    ></input>
                    <p
                        className="cursor-pointer text-start py-2 hover:text-blue-400"
                        onClick={(e) =>
                            Swal.fire(
                                "Lỗi",
                                "Hiện tại chưa có chức năng đổi số điện thoại",
                                "error"
                            )
                        }
                    >
                        <u>Bấm vào đây để đổi số điện thoại</u>
                    </p>
                </div>
            )}
            {!visible && name1 && (
                <div className="flex w-[70%] gap-6">
                    <div className="w-full flex flex-col">
                        <input
                            className={`flex items-center justify-between h-[50px] w-[100%] px-3 relative rounded-lg bg-blue-100 border-solid border-1 outline-none hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer`}
                            value={value}
                            onFocus={() => seterrors([])}
                            onChange={(e) =>
                                setValue((prev) => ({
                                    ...prev,
                                    [name]: e.target.value,
                                }))
                            }
                        ></input>
                        <p className="text-red-500">
                            {errors && MessageErr(name)}
                        </p>
                    </div>
                    <div className="w-full flex flex-col">
                        <input
                            className={`flex items-center justify-between h-[50px] w-[100%] px-3 relative rounded-lg bg-blue-100 border-solid border-1 outline-none hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer `}
                            value={value1}
                            onFocus={() => seterrors([])}
                            onChange={(e) =>
                                setValue((prev) => ({
                                    ...prev,
                                    [name1]: e.target.value,
                                }))
                            }
                        ></input>
                        <p className="text-red-500">
                            {errors && MessageErr(name1)}
                        </p>
                    </div>
                </div>
            )}
            {!visible && !name1 && (
                <div className="flex flex-col w-[70%]">
                    <input
                        className={`flex items-center justify-between h-[50px] w-[100%] px-3 relative rounded-lg bg-blue-100 border-solid border-1 outline-none hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer `}
                        type={password ? "password" : "text"}
                        value={value}
                        onChange={(e) =>
                            setValue((prev) => ({
                                ...prev,
                                [name]: e.target.value,
                            }))
                        }
                    ></input>
                    <p className="text-red-500">{errors && MessageErr(name)}</p>
                </div>
            )}
        </div>
    );
};

export default memo(InputInfor);
