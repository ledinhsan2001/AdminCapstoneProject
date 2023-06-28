import React from "react";
import { mdi_user } from "../../assets/images";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionDetailBlog } from "../../store/actions";
import { useState } from "react";
import { SideBarMain } from ".";

const BlogDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [blog, setblog] = useState("");
    const { blog_detail } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(actionDetailBlog({ _id: id }));
    }, [id, dispatch]);

    useEffect(() => {
        blog_detail && setblog(blog_detail);
    }, [blog_detail]);

    return (
        <div>
            <SideBarMain />
            <div className="ml-[300px] mt-5 w-[84%] bg-[#F5F5F5]">
                <div className="grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="bg-white w-full">
                                <div className=" flex flex-col m-auto w-[60%] gap-4 text-left">
                                    <div className="flex text-[40px] font-bold my-[16px] pt-[60px]">
                                        Tin tức thị trường bất động sản, địa ốc
                                        từ Bds123.vn
                                    </div>
                                    <div className="flex items-center gap-2 ">
                                        <div className="bg-[#d9d9d9] h-[60px] w-[60px] rounded-full">
                                            <img
                                                src={
                                                    blog?.user?.avt || mdi_user
                                                }
                                                alt="avt"
                                                className="rounded-full h-[60px] w-[60px]"
                                            ></img>
                                        </div>
                                        <p className="font-bold">{`${blog?.user?.first_name} ${blog?.user?.last_name}`}</p>
                                        <p className="text-gray-400">
                                            {blog?.createdAt?.split("T")[0]}
                                        </p>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: blog?.content,
                                        }}
                                        className="content mb-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
