import React, { useEffect, useState } from "react";
import { SideBarMain } from ".";
import { useDispatch, useSelector } from "react-redux";
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import ReactPaginate from "react-paginate";
import { actiongetAllPayHisLimit } from "../../store/actions";

const HistoryList = () => {
    const { limit_data_pay_his, total_all_pay_his, page_count_pay_his } =
        useSelector((state) => state.payment);
    const [currentPage, setCurrentPage] = useState(0);
    const [all_pay_his, setall_pay_his] = useState([]);
    const [params] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let page_value = params.get("page");
        let page = page_value ? +page_value - 1 : 0;

        dispatch(
            actiongetAllPayHisLimit({
                page,
            })
        );
        setCurrentPage(+page);
    }, [params, dispatch]);

    useEffect(() => {
        limit_data_pay_his && setall_pay_his(limit_data_pay_his);
    }, [limit_data_pay_his]);

    function handlePageClick(e) {
        let objparams = {};
        objparams["page"] = e.selected + 1;
        navigate({
            pathname: location.pathname,
            search: createSearchParams(objparams).toString(),
        });
    }

    return (
        <div>
            <SideBarMain />
            <div className="ml-[300px] pt-5 mt-3 w-[85%] bg-[#F5F5F5]">
                <div className="grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title text-xl font-bold">
                                Lịch sử thanh toán của người dùng
                            </div>
                            <div className="table-responsive">
                                <div className="text-start text-lg flex">
                                    Tổng cộng:
                                    <p className="font-bold">{`${total_all_pay_his}`}</p>
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>id thanh toán</th>
                                            <th>Họ tên</th>
                                            <th>Số điện thoại</th>
                                            <th>Số tiền</th>
                                            <th>Ngày thanh toán</th>
                                            <th>Ngày hết hạn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {all_pay_his &&
                                            all_pay_his.map((item) => {
                                                return (
                                                    <tr
                                                        key={item._id}
                                                        className=""
                                                    >
                                                        <td className="flex items-center justify-center py-3">
                                                            {item._id}
                                                        </td>
                                                        <td className="">
                                                            <p className="">{`${item?.payment?.user?.first_name} ${item?.payment?.user?.last_name}`}</p>
                                                        </td>
                                                        <td>
                                                            {
                                                                item?.payment
                                                                    ?.user
                                                                    ?.phone
                                                            }
                                                        </td>
                                                        <td>
                                                            <p className="text-green-500">
                                                                {`${item?.payment?.total_price}.000 VND`}
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p className="underline">
                                                                {
                                                                    item
                                                                        ?.payment
                                                                        ?.start_date
                                                                }
                                                            </p>
                                                        </td>
                                                        <td className="">
                                                            {
                                                                item?.payment
                                                                    ?.expiration_date
                                                            }
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                                {all_pay_his.length > 0 && (
                                    <div className="mt-2 w-[100%]">
                                        <ReactPaginate
                                            className=""
                                            breakLabel="..."
                                            nextLabel="next >"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={3}
                                            pageCount={page_count_pay_his}
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
        </div>
    );
};

export default HistoryList;
