import { useEffect, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/vi";
import { actionAllUserLimit } from "../../store/actions";
import { apiDeleteUser } from "../../services";
import { mdi_user } from "../../assets/images";
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import ReactPaginate from "react-paginate";
import { MdDeleteOutline } from "react-icons/md";
import AddAdmin from "./AddAdmin";
import { SideBarMain } from ".";
import Swal from "sweetalert2";
import { path } from "../../utils/constant";

const DashBoard = () => {
    const dispatch = useDispatch();
    const [params] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [showDetail, setshowDetail] = useState(false);
    const [isShowAdmin, setisShowAdmin] = useState(false);
    const [isDeleted, setisDeleted] = useState(false);
    const [user, setuser] = useState([]);
    const [Admin, setAdmin] = useState([]);
    const [user_slice, setuser_slice] = useState([]);
    const { all_user, limit_data_user, total_all_user, page_count_user } =
        useSelector((state) => state.user);
    const { total_all_data } = useSelector((state) => state.real_home);
    const { data_pay_his } = useSelector((state) => state.payment);
    const { isLoggedInAdmin } = useSelector((state) => state.auth);

    useEffect(() => {
        !isLoggedInAdmin && navigate(`/${path.LOGIN_ADMIN}`);
        // eslint-disable-next-line
    }, [isLoggedInAdmin]);

    useEffect(() => {
        setuser(limit_data_user);
    }, [limit_data_user]);

    useEffect(() => {
        setuser_slice(all_user?.slice(0, 5));
        setAdmin(all_user?.filter((item) => item?.roles?.includes(1)));
    }, [all_user]);

    useEffect(() => {
        let page_value = params.get("page");
        let page = page_value ? +page_value - 1 : 0;

        dispatch(
            actionAllUserLimit({
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

    const handleAddAdmin = (e) => {
        e.stopPropagation();
        setisShowAdmin(true);
    };

    const handleDelete = async (user_id) => {
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
                const response = await apiDeleteUser({
                    _id: user_id,
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

    const formatMoney = (x) => {
        x *= 1000;
        return x.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    };

    return (
        <div className="flex">
            <SideBarMain />
            <div className="ml-[300px] pt-5 mt-3 w-full bg-[#F5F5F5] pb-[200px]">
                <div className="flex mb-10 mt-6 ">
                    <div className=" col-sm-4 py-2">
                        <div className="card bg-success text-white h-100">
                            <div className="card-body bg-success bg-[#57b960]">
                                <div className="rotate">
                                    <i className="fa fa-user fa-4x"></i>
                                </div>
                                <div className="text-uppercase">Người dùng</div>
                                <div className="display-4">
                                    {total_all_user}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-sm-4 py-2">
                        <div className="card text-white bg-info h-100">
                            <div className="card-body bg-info">
                                <div className="rotate">
                                    <i className="fa fa-list fa-4x"></i>
                                </div>
                                <div className="text-uppercase">Bài đăng</div>
                                <div className="display-4">
                                    {total_all_data}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-sm-4 py-2">
                        <div className="card text-white bg-warning h-100">
                            <div className="card-body">
                                <div className="rotate">
                                    <i className="fab">
                                        <GiTakeMyMoney
                                            size={60}
                                            color="white"
                                        />
                                    </i>
                                </div>
                                <div className="text-uppercase">Thu nhập</div>
                                <div className="display-4">{`${formatMoney(
                                    data_pay_his?.reduce((initial, value) => {
                                        return (
                                            initial + value.payment.total_price
                                        );
                                    }, 0)
                                )}`}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row ">
                    <div className="col-lg-8 col-md-6 col-sm-12">
                        <div className="flex items-center justify-between">
                            <div className="mt-3 mb-3 text-secondary font-bold">
                                Danh sách tài khoản admin
                            </div>
                            <p
                                className="p-2 m-2 bg-blue-400 text-white rounded-lg hover:cursor-pointer hover:bg-blue-300"
                                onClick={(e) => {
                                    handleAddAdmin(e);
                                }}
                            >
                                Tạo tài khoản admin
                            </p>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped text-left">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="w-[10%] items-center justify-center">
                                            STT
                                        </th>
                                        <th className="w-[20%] items-center justify-center">
                                            Họ tên
                                        </th>
                                        <th className="w-[30%] items-center justify-center">
                                            Email
                                        </th>
                                        <th className="w-[20%] items-center justify-center">
                                            Số điện thoại
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Admin &&
                                        Admin.map((user, index) => {
                                            return (
                                                <tr key={user._id + "admin"}>
                                                    <td>{index}</td>
                                                    <td>{`${user.first_name} ${user.last_name}`}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone}</td>
                                                    <td>
                                                        <div className="flex justify-center gap-1">
                                                            <button
                                                                className="cursor-pointer py-2 px-2 rounded-md bg-red-400 text-white flex items-center overflow-hidden"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        user._id
                                                                    )
                                                                }
                                                            >
                                                                <MdDeleteOutline
                                                                    size={24}
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
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 col-sm-offset-5">
                        <div className="title mt-3 mb-3 text-center text-secondary font-bold">
                            Tài khoản người dùng vừa tạo
                        </div>
                        <hr></hr>
                        <div className="flex flex-col my-2">
                            {user_slice &&
                                user_slice.map((user) => {
                                    return (
                                        <div
                                            className="flex w-full h-[60px] rounded-xl px-4 py-2 items-center text-left bg-white gap-2"
                                            key={user._id + "a"}
                                        >
                                            <div className="rounded-full bg-gray-300 w-[70px] h-[50px]">
                                                <img
                                                    src={user?.avt || mdi_user}
                                                    alt="avt_user"
                                                    className="rounded-full w-[70px] h-[50px]"
                                                ></img>
                                            </div>
                                            <p className="ml-[10px] w-[200px]">{`${user?.first_name} ${user?.last_name}`}</p>
                                            <p className="underline w-[200px]">
                                                {moment(
                                                    user?.createdAt
                                                ).fromNow()}
                                            </p>
                                            {user?.roles.includes(1) ? (
                                                <p className="m-1 p-2 bg-green-600 rounded-[20px] text-white font-bold">
                                                    ADMIN
                                                </p>
                                            ) : (
                                                <p className="m-1 p-2 bg-blue-600 rounded-[20px] text-white font-bold">
                                                    USER
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                        <hr />
                        <p
                            className="p-2 m-1 bg-blue-500 rounded-lg text-white hover:bg-blue-300 hover:cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setshowDetail(true);
                            }}
                        >
                            Xem toàn bộ
                        </p>
                    </div>
                </div>
                {showDetail && (
                    <div className="mt-5">
                        <div className="grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title flex justify-between mx-2 items-center">
                                        Danh sách tại khoản người dùng được tạo
                                        <p
                                            className="p-2 m-1 bg-red-400 w-[100px] rounded-xl text-white hover:bg-red-300 hover:cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setshowDetail(false);
                                            }}
                                        >
                                            Đóng
                                        </p>
                                    </div>
                                    <div className="table-responsive">
                                        <div className="text-start">
                                            <b>{`${total_all_user}`}</b> người
                                            dùng
                                        </div>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th className=" items-center justify-center">
                                                        Avatar
                                                    </th>
                                                    <th className="items-center justify-center">
                                                        Họ tên
                                                    </th>
                                                    <th>Số điện thoại</th>
                                                    <th>Ngày tạo</th>
                                                    <th>Quyền</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user &&
                                                    user.map((user) => {
                                                        return (
                                                            <tr key={user._id}>
                                                                <td className="flex justify-center items-center">
                                                                    <div className="rounded-full bg-gray-300 w-[50px] h-[50px]">
                                                                        <img
                                                                            src={
                                                                                user?.avt ||
                                                                                mdi_user
                                                                            }
                                                                            alt="avt_user"
                                                                            className="rounded-full w-[50px] h-[50px]"
                                                                        ></img>
                                                                    </div>
                                                                </td>
                                                                <td className="">
                                                                    <p className="">{`${user?.first_name} ${user?.last_name}`}</p>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        user?.phone
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <p className="underline">
                                                                        {moment(
                                                                            user?.createdAt
                                                                        ).fromNow()}
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    {user?.roles.includes(
                                                                        1
                                                                    ) ? (
                                                                        <p className="m-1 p-2 bg-green-600 rounded-[20px] text-white font-bold">
                                                                            ADMIN
                                                                        </p>
                                                                    ) : (
                                                                        <p className="m-1 p-2 bg-blue-600 rounded-[20px] text-white font-bold">
                                                                            USER
                                                                        </p>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <div className="flex justify-center gap-1">
                                                                        <button
                                                                            className="cursor-pointer py-2 px-2 rounded-md bg-red-400 text-white flex items-center overflow-hidden"
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    user._id
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
                                        {user.length > 0 && (
                                            <div className="mt-2 w-[100%]">
                                                <ReactPaginate
                                                    className=""
                                                    breakLabel="..."
                                                    nextLabel="next >"
                                                    onPageChange={
                                                        handlePageClick
                                                    }
                                                    pageRangeDisplayed={3}
                                                    pageCount={page_count_user}
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
                    </div>
                )}
                <hr />
                {isShowAdmin && <AddAdmin setisShowAdmin={setisShowAdmin} />}
            </div>
        </div>
    );
};

export default DashBoard;
