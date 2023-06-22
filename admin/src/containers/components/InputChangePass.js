import React from "react";

const InputChangePass = ({
    text,
    value,
    setValue,
    name,
    errors,
    seterrors,
}) => {
    const MessageErr = (name_err) => {
        let mess = errors.find((item) => item.name === name_err);
        return mess?.message;
    };

    return (
        <div className="flex mt-4 items-center w-full justify-center">
            <p
                className={`text-lg text-start font-bold pr-[70px] whitespace-nowrap w-[20%]`}
            >
                {text}
            </p>
            <div className="flex flex-col w-[30%]">
                <input
                    className={`flex items-center justify-between h-[50px] w-[100%] px-3 relative rounded-lg bg-blue-100 border-solid border-1 outline-none hover:bg-white hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer `}
                    value={value}
                    onFocus={() => seterrors([])}
                    onChange={(e) =>
                        setValue((prev) => ({
                            ...prev,
                            [name]: e.target.value,
                        }))
                    }
                ></input>
                <p className="text-red-500">{errors && MessageErr(name)}</p>
            </div>
        </div>
    );
};

export default InputChangePass;
