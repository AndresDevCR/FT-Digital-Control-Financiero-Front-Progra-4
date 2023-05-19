/* eslint-disable react/prop-types */
/* eslint-disable no-new */
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        const myChartRef = chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Sales",
                        data,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default ChartComponent;
