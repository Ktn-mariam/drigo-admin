import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function PieChart({ labels, data }: { labels: string[]; data: number[] }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
        color: 'black',
      },
    },
  };
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'No. of cars',
        data: data,
        backgroundColor: [
          'rgba(23, 126, 137, 0.9)',
          'rgba(8, 76, 97, 0.9)',
          'rgba(219, 58, 52, 0.9)',
          'rgba(255, 200, 87, 0.9)',
        ],
        borderColor: [
          'rgba(23, 126, 137)',
          'rgba(8, 76, 97)',
          'rgba(219, 58, 52)',
          'rgba(255, 200, 87)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie options={options} data={chartData} />;
}