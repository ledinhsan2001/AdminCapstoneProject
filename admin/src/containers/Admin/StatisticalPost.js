import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import { useSelector } from "react-redux";
import { BarChart, SideBarMain } from ".";
import ChartDoughnut from "./ChartDoughnut";

const StatisticalPost = () => {
    const { all_real_home } = useSelector((state) => state.real_home);
    const { data_pay_his } = useSelector((state) => state.payment);
    const [data_active, setdata_active] = useState([]);
    const [data_noactive, setdata_noactive] = useState([]);
    const [all_pay_his, setall_pay_his] = useState([]);
    const [all_real, setall_real] = useState([]);

    useEffect(() => {
        if (all_real_home) {
            const data_active = all_real_home?.filter(
                (item) => item?.active === true
            );
            const data_noactive = all_real_home?.filter(
                (item) => item?.active === false
            );
            setdata_active(data_active);
            setdata_noactive(data_noactive);
            setall_real(all_real_home);
        }
    }, [all_real_home]);

    useEffect(() => {
        setall_pay_his(data_pay_his);
    }, [data_pay_his]);

    const statistical_news = (news_type) => {
        let data_filter = [];
        if (news_type === 0) {
            data_filter = all_pay_his?.filter(
                (item) => item?.payment?.news_type?._id === 0
            );
        }
        if (news_type === 1) {
            data_filter = all_pay_his?.filter(
                (item) => item?.payment?.news_type?._id === 1
            );
        }
        if (news_type === 2) {
            data_filter = all_pay_his?.filter(
                (item) => item?.payment?.news_type?._id === 2
            );
        }
        return data_filter?.length;
    };

    const statistical_num_day = (number_day) => {
        let data_filter = [];
        if (number_day === 5) {
            data_filter = all_pay_his?.filter(
                (item) => item?.payment?.number_day?.number_day === 5
            );
        }
        if (number_day === 10) {
            data_filter = all_pay_his?.filter(
                (item) => item?.payment?.number_day?.number_day === 10
            );
        }
        if (number_day === 15) {
            data_filter = all_pay_his?.filter(
                (item) => item?.payment?.number_day?.number_day === 15
            );
        }
        if (number_day === 30) {
            data_filter = all_pay_his?.filter(
                (item) => item?.payment?.number_day?.number_day === 30
            );
        }
        return data_filter?.length;
    };

    const statistical_trans_type = (trans_type) => {
        let leng_data = [];
        if (trans_type === 0) {
            leng_data = all_real?.filter(
                (item) =>
                    item?.transaction_type_id === "645b56517cc26519dbcaad34"
            );
        }
        if (trans_type === 1) {
            leng_data = all_real?.filter(
                (item) =>
                    item?.transaction_type_id === "645b56517cc26519dbcaad4a"
            );
        }
        return leng_data?.length;
    };

    return (
        <div className="flex">
            <SideBarMain />
            <div className="ml-[300px] pt-5 mt-3 w-full bg-[#F5F5F5] ">
                <div className="flex mb-10 mt-6 ">
                    <div className=" col-sm-6 py-2">
                        <div className="card bg-success text-white h-100">
                            <div className="card-body bg-success bg-[#57b960]">
                                <div className="rotate">
                                    <i className="fa fa-user fa-4x"></i>
                                </div>
                                <div className="text-uppercase">
                                    Tin đang hoạt động
                                </div>
                                <div className="display-4">
                                    {data_active?.length}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-sm-6 py-2">
                        <div className="card text-white bg-info h-100">
                            <div className="card-body bg-info">
                                <div className="rotate">
                                    <i className="fa fa-list fa-4x"></i>
                                </div>
                                <div className="text-uppercase">
                                    Tin hết hạn hoặc chưa thanh toán
                                </div>
                                <div className="display-4">
                                    {data_noactive?.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mx-[100px]">
                    <div className="flex flex-col items-center justify-center">
                        <div className="title my-3 text-secondary text-3xl font-bold">
                            Biểu đồ thống kê loại tin
                        </div>
                        <div className="mb-5 h-[400px] w-[400px]">
                            <PieChart
                                data={{
                                    labels: [
                                        "Tin đặc biệt",
                                        "Tin đặc sắc",
                                        "Tin thường",
                                    ],
                                    datasets: [
                                        {
                                            label: "Tin",
                                            data: [
                                                statistical_news(0),
                                                statistical_news(1),
                                                statistical_news(2),
                                            ],
                                            backgroundColor: [
                                                "red",
                                                "#ED0CC9",
                                                "blue",
                                            ],
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="title my-3 text-secondary text-3xl font-bold">
                            Biểu đồ thống kê tin được đăng theo số ngày
                        </div>
                        <div className="mb-5 h-[400px] w-[400px]">
                            <BarChart
                                data={{
                                    // Name of the variabSles on x-axies for each bar
                                    labels: [
                                        "5 ngày",
                                        "10 ngày",
                                        "15 ngày",
                                        "30 ngày",
                                    ],
                                    datasets: [
                                        {
                                            // Label for bars
                                            label: [
                                                "Thống kê số ngày được chọn thanh toán",
                                            ],
                                            // Data or value of your each variable
                                            data: [
                                                statistical_num_day(5),
                                                statistical_num_day(10),
                                                statistical_num_day(15),
                                                statistical_num_day(30),
                                            ],
                                            // Color of each bar
                                            backgroundColor: [
                                                "aqua",
                                                "green",
                                                "red",
                                                "yellow",
                                            ],
                                            // Border color of each bar
                                            borderColor: [
                                                "aqua",
                                                "green",
                                                "red",
                                                "yellow",
                                            ],
                                            borderWidth: 0.5,
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex mx-[100px] my-[50px] items-center justify-center">
                    <div className="flex flex-col ">
                        <div className="title my-3 text-secondary text-3xl font-bold">
                            Biểu đồ thống kê loại giao dịch
                        </div>
                        <div className="mb-5 h-[400px] w-[400px]">
                            <ChartDoughnut
                                data={{
                                    labels: ["Mua bán", "Cho thuê"],
                                    datasets: [
                                        {
                                            label: "Loại giao dịch",
                                            data: [
                                                statistical_trans_type(0),
                                                statistical_trans_type(1),
                                            ],
                                            backgroundColor: [
                                                "#EEDC82",
                                                "#B4CDCD",
                                            ],
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticalPost;

// <div className="flex justify-between mx-[100px] my-[50px]">
//                     <div className="flex flex-col items-center justify-center">
//                         <div className="title my-3 text-secondary text-3xl font-bold">
//                             Biểu đồ thống kê loại bất động sản mua bán
//                         </div>
//                         <div className="mb-5 h-[400px] w-[400px]">
//                             <ChartDoughnut
//                                 data={{
//                                     labels: [
//                                         "Bán căn hộ",
//                                         "Bán nhà mặt tiền",
//                                         "Bán đất nền dự án",
//                                         "Bán khách sạn",
//                                         "bán cửa hàng",
//                                         "Bán biệt thự",
//                                         "Bán nhà riêng",
//                                         "Bán đất",
//                                         "Bán nhà trọ",
//                                         "Bán kho, xưởng",
//                                     ],
//                                     datasets: [
//                                         {
//                                             label: "Loại bất động sản",
//                                             data: [
//                                                 12, 19, 3, 5, 2, 3, 3, 3, 3, 3,
//                                             ],
//                                             backgroundColor: [
//                                                 "rgba(255, 99, 132, 0.2)",
//                                                 "rgba(54, 162, 235, 0.2)",
//                                                 "rgba(255, 206, 86, 0.2)",
//                                                 "rgba(75, 192, 192, 0.2)",
//                                                 "rgba(153, 102, 255, 0.2)",
//                                                 "rgba(255, 159, 80, 0.2)",
//                                                 "rgba(255, 159, 64, 0.5)",
//                                                 "rgba(255, 140, 64, 0.2)",
//                                                 "rgba(255, 159, 64, 0.8)",
//                                                 "rgba(255, 159, 68, 0.2)",
//                                                 "rgba(255, 159, 70, 0.2)",
//                                             ],
//                                             borderColor: [
//                                                 "rgba(255, 99, 132, 1)",
//                                                 "rgba(54, 162, 235, 1)",
//                                                 "rgba(255, 206, 86, 1)",
//                                                 "rgba(75, 192, 192, 1)",
//                                                 "rgba(153, 102, 255, 1)",
//                                                 "rgba(255, 159, 64, 1)",
//                                             ],
//                                             borderWidth: 1,
//                                         },
//                                     ],
//                                 }}
//                             />
//                         </div>
//                     </div>
//                     <div className="flex flex-col items-center justify-center">
//                         <div className="title my-3 text-secondary text-3xl font-bold">
//                             Biểu đồ thống kê loại bất động sản cho thuê
//                         </div>
//                         <div className="mb-5 h-[400px] w-[400px]">
//                             <ChartDoughnut
//                                 data={{
//                                     labels: [
//                                         "Cho thuê đất",
//                                         "Cho thuê kho, xưởng",
//                                         "Cho khách sạn",
//                                         "Cho thuê căn hộ",
//                                         "Cho văn phòng",
//                                         "Phòng trọ",
//                                         "Ở ghép",
//                                         "Cho thuê nhà nguyên căn",
//                                         "Mặt bằng",
//                                         "Thuê nhà mặt tiền",
//                                     ],
//                                     datasets: [
//                                         {
//                                             label: "Loại bất động sản",
//                                             data: [
//                                                 12, 19, 3, 5, 2, 3, 3, 3, 3, 3,
//                                             ],
//                                             backgroundColor: [
//                                                 "rgba(255, 99, 132, 0.2)",
//                                                 "rgba(54, 162, 235, 0.2)",
//                                                 "rgba(255, 206, 86, 0.2)",
//                                                 "rgba(75, 192, 192, 0.2)",
//                                                 "rgba(153, 102, 255, 0.2)",
//                                                 "rgba(255, 159, 80, 0.2)",
//                                                 "rgba(255, 159, 64, 0.5)",
//                                                 "rgba(255, 140, 64, 0.2)",
//                                                 "rgba(255, 159, 64, 0.8)",
//                                                 "rgba(255, 159, 68, 0.2)",
//                                                 "rgba(255, 159, 70, 0.2)",
//                                             ],
//                                             borderWidth: 1,
//                                         },
//                                     ],
//                                 }}
//                             />
//                         </div>
//                     </div>
//                 </div>
