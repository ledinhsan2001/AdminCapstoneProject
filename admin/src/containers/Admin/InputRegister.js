import React from "react";

const InputRegister = ({
    text,
    text1,
    placeholder,
    placeholder1,
    name,
    name1,
    value,
    value1,
    setValue,
    errors,
    seterrors,
    double,
    password,
}) => {
    const MessageErr = (name_err) => {
        let mess = errors.find((item) => item.name === name_err);
        return mess?.message;
    };

    return (
        <div>
            {!double && (
                <div className="w-full flex flex-col text-left text-[16px]">
                    <label htmlFor={name} className="w-[100%] mt-2">
                        {text}
                    </label>
                    <input
                        id={name}
                        type={password ? `password` : "text"}
                        placeholder={placeholder}
                        value={value}
                        onFocus={() => seterrors([])}
                        onChange={(e) =>
                            setValue((prev) => ({
                                ...prev,
                                [name]: e.target.value,
                            }))
                        }
                        className="h-[36px] pl-1 border-[1px] border-solid rounded-[10px] bg-white text-black w-[100%] border-black hover:border-[2px] hover:border-solid hover:border-blue-400 outline-none"
                    />
                    <p className="text-red-500 text-left italic">
                        {errors && MessageErr(name)}
                    </p>
                </div>
            )}
            {double && (
                <div className="flex w-full items-center mt-3 text-left gap-4">
                    <div className="flex flex-col">
                        <label htmlFor={name} className="w-[100%] mt-2">
                            {text}
                        </label>
                        <input
                            id={name}
                            type="text"
                            placeholder={placeholder}
                            value={value}
                            onFocus={() => seterrors([])}
                            onChange={(e) =>
                                setValue((prev) => ({
                                    ...prev,
                                    [name]: e.target.value,
                                }))
                            }
                            className="h-[36px] pl-1 border-[1px] border-solid rounded-[10px] bg-white text-black w-[100%] border-black hover:border-[2px] hover:border-solid hover:border-blue-400 outline-none"
                        />
                        <p className="text-red-500 text-left italic w-[80%]">
                            {errors && MessageErr(name)}
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor={name1} className="w-[100%] mt-2">
                            {text1}
                        </label>
                        <input
                            id={name1}
                            type="text"
                            placeholder={placeholder1}
                            value={value1}
                            onFocus={() => seterrors([])}
                            onChange={(e) =>
                                setValue((prev) => ({
                                    ...prev,
                                    [name1]: e.target.value,
                                }))
                            }
                            className="h-[36px] pl-1 border-[1px] border-solid rounded-[10px] bg-white text-black w-[100%] border-black hover:border-[2px] hover:border-solid hover:border-blue-400 outline-none"
                        />
                        <p className="text-red-500 text-left italic  w-[80%]">
                            {errors && MessageErr(name1)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputRegister;
