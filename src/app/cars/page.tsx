"use client"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import CarCard from './CarCard';

type Car = {
  id: number;
  brandName: string;
  modelName: string;
  manufactureYear: number;
  colorName: string;
  colorHexCode: string;
  plateNumber: string;
  imei: string;
  fuelLevel: number;
  isActive: boolean;
  createdAt: string;
  activeRentalId: number | null;
  endTripAvailableCities: string[];
};

const Cars = () => {
  const router = useRouter()
  const [carData, setCarData] = useState<Car[] | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/cars', { credentials: "include" });
        const data = await response.json();
        console.log('car data:', data);

        // if (data.status === 401) {
        //   router.push('/login');
        // }

        setCarData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {carData && <div className='grid grid-cols-3 gap-4 w-3/4 m-10'>
        {carData.map((car, index) => {
          return <CarCard key={index} car={car} />
        })}
      </div>}
    </div>
  )
}

export default Cars
