import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDoughnut = ({ data }) => {
    return (
        <div>
            <Doughnut data={data} />
        </div>
    );
};

export default ChartDoughnut;
