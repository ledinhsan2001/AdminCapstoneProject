import React, { useState } from "react";
import { AddBlog, SideBarMain } from ".";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
    Link,
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";
import { actionGetAllBlogLimit } from "../../store/actions";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { apiDeleteBlog } from "../../services";
import { dataBlogEdit } from "../../store/actions/actionBlog";
import { formatUniToString } from "../../utils/constant";

const Blog = () => {
    const [isShowBlog, setisShowBlog] = useState(false);
    const [isDeleted, setisDeleted] = useState(false);
    const [data_blogs, setdata_blogs] = useState([]);
    const [params] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const { data_blog_limit, total_blog, page_count_blog, message } =
        useSelector((state) => state.blog);

    const handleAddBlog = (e) => {
        e.stopPropagation();
        setisShowBlog(true);
    };

    useEffect(() => {
        data_blog_limit?.length > 0 && setdata_blogs(data_blog_limit);
    }, [data_blog_limit]);

    useEffect(() => {
        let page_value = params.get("page");
        let page = page_value ? +page_value - 1 : 0;

        dispatch(
            actionGetAllBlogLimit({
                page,
            })
        );
        setCurrentPage(+page);
    }, [params, dispatch, isDeleted]);

    function handlePageClick(e) {
        let objparams = {};
        objparams["page"] = e.selected + 1;
        navigate({
            pathname: location.pathname,
            search: createSearchParams(objparams).toString(),
        });
    }

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Bạn có chắc muốn xóa không?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tất nhiên rồi!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteBlog({
                    _id: _id,
                });
                if (response?.data?.success === true) {
                    Swal.fire("Xóa!", response?.data?.message, "success");
                    setisDeleted(!isDeleted);
                } else {
                    Swal.fire("Lỗi!", response.data.message, "error");
                }
            }
        });
    };

    return (
        <div>
            <SideBarMain />
            <div className="ml-[300px] pt-4 w-[84%] bg-[#F5F5F5]">
                <div className="grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title text-xl font-bold mt-10">
                                Danh sách Blog
                            </h4>
                            <div className="table-responsive">
                                <div className="flex justify-between">
                                    <div className="text-start text-lg flex justify-center items-center">
                                        Tổng số blog:
                                        <p className="font-bold ml-1">
                                            {total_blog}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            className="p-2 my-2 bg-blue-400 text-white rounded-lg hover:cursor-pointer hover:bg-blue-300 mr-[100px]"
                                            onClick={(e) => {
                                                handleAddBlog(e);
                                            }}
                                        >
                                            Tạo blog
                                        </p>
                                    </div>
                                </div>
                                {message && (
                                    <div className="bg-white">{message}</div>
                                )}
                                <table className="table table-striped text-left">
                                    <thead>
                                        <tr>
                                            <th className="w-[2%]">Id</th>
                                            <th className="w-[10%]">Ảnh</th>
                                            <th className="w-[13%]">Tiêu đề</th>
                                            <th className="w-[10%]">
                                                Ngày tạo
                                            </th>
                                            <th className="w-[10%]">
                                                Ngày chỉnh sửa
                                            </th>
                                            <th className="w-[8%]">
                                                Người đăng
                                            </th>
                                            <th className="w-[5%]"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data_blogs?.length > 0 &&
                                            data_blogs.map((item) => {
                                                return (
                                                    <tr
                                                        key={item._id}
                                                        className=""
                                                    >
                                                        <td className="">
                                                            {item._id}
                                                        </td>
                                                        <td>
                                                            <img
                                                                src={
                                                                    item.thumbnail_url
                                                                }
                                                                alt="thumbnail"
                                                                className="h-[100px] w-[300px]"
                                                            ></img>
                                                        </td>
                                                        <td className="font-bold ">
                                                            <Link
                                                                to={`/blog/chi-tiet/${
                                                                    item._id
                                                                }?${formatUniToString(
                                                                    item?.title
                                                                )}`}
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {item.createdAt}
                                                        </td>
                                                        <td>
                                                            {item.updatedAt}
                                                        </td>
                                                        <td>
                                                            <p className="text-blue-600 font-bold">{`${item?.user?.first_name} ${item?.user?.last_name}`}</p>
                                                        </td>
                                                        <td className="font-bold justify-center">
                                                            <div className="flex justify-center gap-1">
                                                                <button
                                                                    className="cursor-pointer py-2 px-1 rounded-md bg-green-500 text-white flex items-center overflow-hidden"
                                                                    onClick={() => {
                                                                        dispatch(
                                                                            dataBlogEdit(
                                                                                item
                                                                            )
                                                                        );
                                                                        setisShowBlog(
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    <CiEdit
                                                                        color="white"
                                                                        size={
                                                                            24
                                                                        }
                                                                    />
                                                                    Sửa
                                                                </button>
                                                                <button
                                                                    className="cursor-pointer py-2 px-2 rounded-md bg-red-400 text-white flex items-center overflow-hidden"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            item._id
                                                                        )
                                                                    }
                                                                >
                                                                    <MdDeleteOutline
                                                                        size={
                                                                            24
                                                                        }
                                                                    />
                                                                    Xóa
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                                {data_blogs?.length > 0 && (
                                    <div className="mt-2 w-[100%]">
                                        <ReactPaginate
                                            className=""
                                            breakLabel="..."
                                            nextLabel="next >"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={3}
                                            pageCount={page_count_blog}
                                            previousLabel="< previous"
                                            renderOnZeroPageCount={null}
                                            marginPagesDisplayed={1}
                                            containerClassName="pagination justify-content-center"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            activeClassName="active"
                                            forcePage={currentPage}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {isShowBlog && <AddBlog setisShowBlog={setisShowBlog} />}
            </div>
        </div>
    );
};

export default Blog;
