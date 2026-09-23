"use client"
import LineChart from '../../components/LineChart'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

type TrendData = {
  date: Date;
  count: number;
}

type RevenueData = {
  date: Date;
  revenue: number;
}

function Trends() {
  const router = useRouter();
  const [rentalTrends, setRentalTrends] = useState<TrendData[] | null>(null);
  const [reservationTrends, setReservationTrends] = useState<TrendData[] | null>(null);
  const [revenueTrends, setRevenueTrends] = useState<TrendData[] | null>(null);
  const [userRegistrationTrends, setUserRegistrationTrends] = useState<TrendData[] | null>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [option, setOption] = useState<string>('Rental');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/dashboard/trends', { credentials: "include" });
        const data = await response.json();
        console.log('Fetched data:', data);

        if (data.status === 401) {
          router.push('/login');
        }

        const labels = data.rentalTrends.map((item: TrendData) => item.date);
        const formattedLabels = labels.map((date: string) => {
          const day = date.substring(8, 10);
          const month = date.substring(5, 7);
          return `${day}/${month}`;
        });
        setLabels(formattedLabels);
        const rentalData = data.rentalTrends.map((item: TrendData) => item.count);
        const reservationData = data.reservationTrends.map((item: TrendData) => item.count);
        const revenueData = data.revenueTrends.map((item: RevenueData) => item.revenue);
        const userRegistrationData = data.userRegistrationTrends.map((item: TrendData) => item.count);

        setRentalTrends(rentalData);
        setReservationTrends(reservationData);
        setRevenueTrends(revenueData);
        setUserRegistrationTrends(userRegistrationData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const rentalDataset = {
    label: 'Rental',
    data: rentalTrends,
    borderColor: 'rgba(194, 0, 251, 0.5)',
    backgroundColor: 'rgba(194, 0, 251, 0.5)',
    fill: true,
    cubicInterpolationMode: 'monotone',
  };

  const reservationDataset = {
    label: 'Reservation',
    data: reservationTrends,
    borderColor: 'rgba(236, 8, 104, 0.5)',
    backgroundColor: 'rgba(236, 8, 104, 0.5)',
    fill: true,
    cubicInterpolationMode: 'monotone',
  }

  const revenueDataset = {
    label: 'Revenue',
    data: revenueTrends,
    borderColor: 'rgba(252, 47, 0, 0.5)',
    backgroundColor: 'rgba(252, 47, 0, 0.5)',
    fill: true,
    cubicInterpolationMode: 'monotone',
  }

  const userRegistrationDataset = {
    label: 'User Registration',
    data: userRegistrationTrends,
    borderColor: 'rgba(236, 125, 16, 0.5)',
    backgroundColor: 'rgba(236, 125, 16, 0.5)',
    fill: true,
    cubicInterpolationMode: 'monotone',
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center">
      <h1 className="text-lg font-bold mb-4">Trends this month</h1>
      <div>
        <button className={`px-4 py-1 ${option === 'Rental' ? 'bg-purple-400' : 'bg-purple-200'} leading-none hover:cursor-pointer`} onClick={() => setOption('Rental')}>Rental</button>
        <button className={`px-4 py-1 ${option === 'Reservation' ? 'bg-pink-400' : 'bg-pink-200'} leading-none hover:cursor-pointer`} onClick={() => setOption('Reservation')}>Reservation</button>
        <button className={`px-4 py-1 ${option === 'Revenue' ? 'bg-orange-400' : 'bg-orange-200'} leading-none hover:cursor-pointer`} onClick={() => setOption('Revenue')}>Revenue</button>
        <button className={`px-4 py-1 ${option === 'User Registration' ? 'bg-amber-400' : 'bg-amber-200'} leading-none hover:cursor-pointer`} onClick={() => setOption('User Registration')}>User Registration</button>
      </div>
      <div className="h-96 w-full">
        {option === 'Rental' && (
          <LineChart labels={labels} dataset={rentalDataset} />
        )}
        {option === 'Reservation' && (
          <LineChart labels={labels} dataset={reservationDataset} />
        )}
        {option === 'Revenue' && (
          <LineChart labels={labels} dataset={revenueDataset} />
        )}
        {option === 'User Registration' && (
          <LineChart labels={labels} dataset={userRegistrationDataset} />
        )}
      </div>
    </div>
  )
}

export default Trends
