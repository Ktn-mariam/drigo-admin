"use client"
import LineChart from '../../components/LineChart'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

type TrendData = {
  date: Date;
  count: number;
}

function Dashboard() {
  const router = useRouter();
  const [rentalTrends, setRentalTrends] = useState<TrendData[] | null>(null);
  const [reservationTrends, setReservationTrends] = useState<TrendData[] | null>(null);
  const [revenueTrends, setRevenueTrends] = useState<TrendData[] | null>(null);
  const [userRegistrationTrends, setUserRegistrationTrends] = useState<TrendData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/dashboard/trends', { credentials: "include" });
        const data = await response.json();
        console.log('Fetched data:', data);

        if (data.status === 401) {
          router.push('/login');
        }

        setRentalTrends(data.rentalTrends);
        setReservationTrends(data.reservationTrends);
        setRevenueTrends(data.revenueTrends);
        setUserRegistrationTrends(data.userRegistrationTrends);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleTrendFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFilter = event.target.value;
    console.log('Selected trend filter:', selectedFilter);
    // Implement logic to update the displayed trends based on the selected filter
  }

  return (
    <div className='flex flex-col gap-4 items-center h-96'>
      <LineChart />
      <div className='flex gap-4'>
        <div className='flex gap-1 items-center'>
          <input type="checkbox" name="Type" id="All" value="Rental" onChange={handleTrendFilterChange} />
          <label htmlFor="All">All</label>
        </div>
        <div className='flex gap-1 items-center'>
          <input type="checkbox" name="Type" id="Economy" value="Reservation" onChange={handleTrendFilterChange} />
          <label htmlFor="Economy">Economy</label>
        </div>
        <div className='flex gap-1 items-center'>
          <input type="checkbox" name="Type" id="Sedan" value="Revenue" onChange={handleTrendFilterChange} />
          <label htmlFor="Sedan">Sedan</label>
        </div>
        <div className='flex gap-1 items-center'>
          <input type="checkbox" name="Type" id="SUV" value="User Registration" onChange={handleTrendFilterChange} />
          <label htmlFor="SUV">SUV</label>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
