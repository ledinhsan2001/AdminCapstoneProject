import { Editor as ClassicEditor } from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import Swal from "sweetalert2";
import { validate_data } from "../../utils/validate_data";
import { upload_image } from "../../assets/images";
import { InputInfor } from "../components";
import { apiUploadImages } from "../../services";
import { apiAddBlog, apiPutBlog } from "../../services/blog";
import { actionGetAllBlogLimit, delDataBlogEdit } from "../../store/actions";
import { useSearchParams } from "react-router-dom";

const AddBlog = ({ setisShowBlog }) => {
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const { data_edit, blog_types } = useSelector((state) => state.blog);
    const [errors, seterrors] = useState([]);
    const [params] = useSearchParams();
    const [payload, setpayload] = useState({
        title: data_edit?.title || "",
        content: data_edit?.content || "",
        thumbnail: data_edit?.thumbnail_url || "",
        blog_type_id: data_edit?.blog_type_id || "",
    });

    const handleSubmit = async () => {
        let count = validate_data(payload, seterrors);
        if (count !== 0) {
            Swal.fire("Lỗi!", "Tạo blog có lỗi!", "error");
        } else {
            if (data_edit) {
                const response = await apiPutBlog(payload, data_edit._id);
                if (response.data.success === true) {
                    Swal.fire("Thành công!", response.data.message, "success");

                    let objsearch = {};
                    let page_value = params.get("page");
                    let page = page_value ? +page_value - 1 : 0;
                    objsearch["page"] = page;

                    let blog_type_id_value = params.get("blog_type_id");
                    if (blog_type_id_value) {
                        objsearch["blog_type_id"] = blog_type_id_value;
                    }
                    dispatch(actionGetAllBlogLimit(objsearch));
                } else {
                    Swal.fire("Lỗi!", response.data.message, "error");
                }
            } else {
                const response = await apiAddBlog(payload);
                if (response.data.success === true) {
                    Swal.fire("Thành công!", response.data.message, "success");
                    dispatch(actionGetAllBlogLimit({ page: 0 }));
                } else {
                    Swal.fire("Lỗi!", response.data.message, "error");
                }
            }
            dispatch(delDataBlogEdit());
            setisShowBlog(false);
            setpayload({ title: "", content: "", thumbnail: "" });
        }
    };

    const handleUploadImages = async (e) => {
        e.stopPropagation();
        setisLoading(true);

        let file = e.target.files;
        const image = new FormData();

        image.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);
        image.append("folder", process.env.REACT_APP_FOLDER_NAME);
        image.append("file", file[0]);

        const response = await apiUploadImages(image);
        if (response.status === 200) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Tải ảnh thành công",
                showConfirmButton: false,
                timer: 2000,
            });
            setpayload((prev) => ({
                ...prev,
                thumbnail: response.data.secure_url,
            }));
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Tải ảnh không thành công",
                showConfirmButton: false,
                timer: 2000,
            });
        }
        setisLoading(false);
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setpayload((prev) => ({
            ...prev,
            content: data,
        }));
    };

    const MessageErr = (name_err) => {
        let mess = errors.find((item) => item.name === name_err);
        return mess?.message;
    };

    return (
        <div
            className="absolute top-0 bottom-0 right-0 left-0 bg-overlay-30 overflow-y-auto justify-center"
            onClick={(e) => {
                e.stopPropagation();
                setisShowBlog(false);
                dispatch(delDataBlogEdit());
            }}
        >
            <div
                className="flex"
                onClick={(e) => {
                    e.stopPropagation();
                    setisShowBlog(false);
                    dispatch(delDataBlogEdit());
                }}
            >
                <div
                    className="pt-5 w-full pb-[200px]"
                    onClick={(e) => {
                        e.stopPropagation();
                        setisShowBlog(false);
                        dispatch(delDataBlogEdit());
                    }}
                >
                    <div className="flex justify-center w-full">
                        <div className="pt-4 w-[60%]">
                            <div className="text-left text-white font-bold text-4xl pb-4">
                                {data_edit ? "Cập nhật blog" : "Tạo blog"}
                            </div>
                            <div
                                className="flex flex-col h-auto px-[10%] bg-white pb-4"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setisShowBlog(true);
                                }}
                            >
                                <div className="pt-4">
                                    <div className="flex mt-4 items-center">
                                        <div className="text-lg font-bold">
                                            Ảnh đại diện
                                        </div>
                                        <div className="flex flex-col ml-[140px]">
                                            <div className="flex bg-[#D9D9D9] items-center justify-center hover:text-gray-600 h-[200px] w-[400px] mb-2 relative">
                                                <img
                                                    src={
                                                        payload?.thumbnail ||
                                                        upload_image
                                                    }
                                                    alt="mdi_user"
                                                    className="h-[200px] w-[400px] "
                                                ></img>
                                            </div>
                                            <input
                                                id="image"
                                                hidden
                                                type="file"
                                                onChange={handleUploadImages}
                                            />
                                            {isLoading ? (
                                                <div className="flex absolute ml-[400px] mt-[40px]">
                                                    <RotatingLines
                                                        strokeColor="grey"
                                                        strokeWidth="5"
                                                        animationDuration="0.75"
                                                        width="126"
                                                        visible={true}
                                                    />
                                                </div>
                                            ) : (
                                                <label
                                                    className="text-lg justify-center items-center cursor-pointer text-md mt-2  hover:text-blue-400"
                                                    htmlFor="image"
                                                    onFocus={() =>
                                                        seterrors([])
                                                    }
                                                >
                                                    <u>Chọn ảnh khác</u>
                                                </label>
                                            )}
                                            <p className="text-red-500">
                                                {errors &&
                                                    MessageErr("thumbnail")}
                                            </p>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <InputInfor
                                        text="Tiêu đề"
                                        value={payload?.title || ""}
                                        setValue={setpayload}
                                        double
                                        name="title"
                                        errors={errors}
                                        seterrors={seterrors}
                                    />
                                    {/*  */}
                                    <div className=" flex items-center text-left gap-1 my-10">
                                        <p className="mr-4 text-[18px] font-bold">
                                            Kiểu blog
                                        </p>
                                        <div className="flex flex-col">
                                            <select
                                                className="ml-[140px] h-[40px] w-[150px] px-2 rounded-xl border-solid border-1 bg-blue-100 border-blue-500 hover:bg-white hover:text-black hover:border-solid hover:border-2 hover:border-blue-300 cursor-pointer"
                                                value={payload?.blog_type_id}
                                                onChange={(e) =>
                                                    setpayload((prev) => ({
                                                        ...prev,
                                                        blog_type_id:
                                                            e.target.value,
                                                    }))
                                                }
                                                onFocus={() => seterrors([])}
                                            >
                                                <option
                                                    className="text-gray-500 font-bold"
                                                    value={""}
                                                >
                                                    Tất cả
                                                </option>
                                                {blog_types?.length > 0 &&
                                                    blog_types.map((item) => {
                                                        return (
                                                            <option
                                                                className="text-gray-500 font-bold"
                                                                value={item._id}
                                                                key={item._id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                            <p className="text-red-500 ml-[140px]">
                                                {errors &&
                                                    MessageErr("blog_type_id")}
                                            </p>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div className="text-left mt-10">
                                        <p className="font-bold text-lg mb-3">
                                            Nội dung
                                        </p>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{
                                                removePlugins: ["MarkDown"],
                                                placeholder:
                                                    "Nhập nội dung ở đây...",
                                                toolbar: {
                                                    shouldNotGroupWhenFull: true,
                                                },
                                                markdown: {
                                                    enabled: true,
                                                },
                                            }}
                                            data={payload?.content}
                                            onChange={handleEditorChange}
                                            onFocus={() => seterrors([])}
                                        />
                                        <p className="text-red-500">
                                            {errors && MessageErr("content")}
                                        </p>
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
                                            {data_edit ? "Cập nhật" : "Tạo"}
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

export default memo(AddBlog);
