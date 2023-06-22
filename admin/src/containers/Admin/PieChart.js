import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => (
    <>
        <div className="header">
            <div className="links"></div>
        </div>
        <Pie data={data} />
    </>
);

export default PieChart;
