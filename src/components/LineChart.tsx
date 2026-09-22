"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type LineChartProps = {
  labels: string[];
  dataset: any;
};

export default function LineChart({ labels, dataset }: LineChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
        color: 'black',
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        ticks: {
          color: "black",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  console.log(dataset);

  const data = {
    labels,
    datasets: [dataset]
  };

  return <Line options={options} data={data} />;
}