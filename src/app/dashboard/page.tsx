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

function Dashboard() {
  const router = useRouter();
  const [rentalTrends, setRentalTrends] = useState<TrendData[] | null>(null);
  const [reservationTrends, setReservationTrends] = useState<TrendData[] | null>(null);
  const [revenueTrends, setRevenueTrends] = useState<TrendData[] | null>(null);
  const [userRegistrationTrends, setUserRegistrationTrends] = useState<TrendData[] | null>(null);
  const [labels, setLabels] = useState<string[]>([]);

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
    borderColor: 'rgba(252, 47, 0, 0.5)',
    backgroundColor: 'rgba(252, 47, 0, 0.5)',
    fill: true,
    cubicInterpolationMode: 'monotone',
  }

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="h-72 w-full">
        <LineChart labels={labels} dataset={rentalDataset} />
      </div>
      <div className="h-72 w-full">
        <LineChart labels={labels} dataset={reservationDataset} />
      </div>
      <div className="h-72 w-full">
        <LineChart labels={labels} dataset={revenueDataset} />
      </div>
      <div className="h-72 w-full">
        <LineChart labels={labels} dataset={userRegistrationDataset} />
      </div>
    </div>
  )
}

export default Dashboard
