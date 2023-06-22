import React, { useEffect, useState } from "react";
import { BarChart, SideBarMain } from ".";
import { useSelector } from "react-redux";
import { GiTakeMyMoney } from "react-icons/gi";

const StatisticalMoney = () => {
    const { data_pay_his, total_payment_his } = useSelector(
        (state) => state.payment
    );
    const [all_pay_his, setall_pay_his] = useState([]);

    useEffect(() => {
        data_pay_his && setall_pay_his(data_pay_his);
    }, [data_pay_his]);

    const statistical = (number_day) => {
        let total_statistical;
        let data_filter = [];
        if (number_day === 5) {
            data_filter = all_pay_his.filter(
                (item) => item?.payment?.number_day?.number_day === 5
            );
        }
        if (number_day === 10) {
            data_filter = all_pay_his.filter(
                (item) => item?.payment?.number_day?.number_day === 10
            );
        }
        if (number_day === 15) {
            data_filter = all_pay_his.filter(
                (item) => item?.payment?.number_day?.number_day === 15
            );
        }
        if (number_day === 30) {
            data_filter = all_pay_his.filter(
                (item) => item?.payment?.number_day?.number_day === 30
            );
        }
        total_statistical = data_filter?.reduce((initial, value) => {
            return initial + value?.payment?.total_price;
        }, 0);
        return total_statistical;
    };

    return (
        <div className="flex">
            <SideBarMain />
            <div className="ml-[300px] pt-5 mt-3 w-full bg-[#F5F5F5] ">
                <div className="flex justify-center items-center py-2">
                    <div className="card text-white bg-warning h-100">
                        <div className="card-body">
                            <div className="rotate">
                                <i className="fab">
                                    <GiTakeMyMoney size={60} color="white" />
                                </i>
                            </div>
                            <h6 className="text-uppercase">Tổng thu nhập</h6>
                            <h1 className="display-4">{`${data_pay_his?.reduce(
                                (initial, value) => {
                                    return initial + value.payment.total_price;
                                },
                                0
                            )}.000 VND`}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex mb-10 mt-6 ">
                    <div className=" col-sm-3 py-2">
                        <div className="card bg-success text-white h-100">
                            <div className="card-body bg-[#999999]">
                                <h6 className="text-uppercase text-[50px]">
                                    5 ngày
                                </h6>
                                <p className="display-4 text-[30px]">{`${statistical(
                                    5
                                )}.000 VND`}</p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-sm-3 py-2">
                        <div className="card bg-success text-white h-100">
                            <div className="card-body  bg-[#008000]">
                                <h6 className="text-uppercase text-[50px]">
                                    10 ngày
                                </h6>
                                <p className="display-4 text-[30px]">
                                    {`${statistical(10)}.000 VND`}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-sm-3 py-2">
                        <div className="card bg-success text-white h-100">
                            <div className="card-body  bg-[#ff0000]">
                                <h6 className="text-uppercase text-[50px]">
                                    15 ngày
                                </h6>
                                <p className="display-4 text-[30px]">
                                    {`${statistical(15)}.000 VND`}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-sm-3 py-2">
                        <div className="card bg-success text-white h-100">
                            <div className="card-body  bg-[#999933]">
                                <h6 className="text-uppercase text-[50px]">
                                    30 ngày
                                </h6>
                                <p className="display-4 text-[30px]">
                                    {`${statistical(30)}.000 VND`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center mx-10">
                    <div className="flex flex-col ">
                        <h4 className="title my-3 text-secondary text-3xl font-bold">
                            Biểu đồ thống kê thu nhập theo số ngày
                        </h4>
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
                                                statistical(5),
                                                statistical(10),
                                                statistical(15),
                                                statistical(30),
                                            ],
                                            // Color of each bar
                                            backgroundColor: [
                                                "#999999",
                                                "green",
                                                "red",
                                                "#999933",
                                            ],
                                            // Border color of each bar
                                            borderColor: [
                                                "aqua",
                                                "green",
                                                "red",
                                                "#999933",
                                            ],
                                            borderWidth: 0.5,
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

export default StatisticalMoney;
