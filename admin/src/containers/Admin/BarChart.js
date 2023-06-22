import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ data }) => {
    return (
        <div>
            <Bar
                data={data}
                // Height of graph
                height={400}
                options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    maintainAspectRatio: false,
                    legend: {
                        labels: {
                            fontSize: 15,
                        },
                    },
                }}
            />
        </div>
    );
};

export default BarChart;
