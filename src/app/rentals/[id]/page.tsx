"use client"
import { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { RentalDetailType, RentalStatus } from '@/types/Rental';
import { LuDot } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoCube } from "react-icons/io5";

const RentalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [rentalDetail, setRentalDetail] = useState<RentalDetailType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/rentals/${id}`, { credentials: "include" });
        const data = await response.json();
        console.log('rental data:', data);

        // if (data.status === 401) {
        //   router.push('/login');
        // }

        setRentalDetail(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className='mx-20 my-10'>
      {rentalDetail && <div className='flex flex-col gap-5'>
        <div className='border-2 border-gray-200 rounded-2xl p-5'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-2 mb-3'>
              <p className='text-sm font-semibold'>RENTAL #{rentalDetail.id}</p>
              <div className='flex items-end gap-3'>
                <h1 className='text-4xl font-semibold'>{rentalDetail.car.brand} {rentalDetail.car.model}</h1>
              </div>
              <div className='flex gap-1 text-sm items-center'>
                <p>{rentalDetail.car.plateNumber}</p>
                <LuDot />
                <p>{rentalDetail.car.color}</p>
                <LuDot />
                <p>{rentalDetail.car.year}</p>
                <LuDot />
                <p>{rentalDetail.car.fuelType}</p>
              </div>
            </div>
            <div className='flex gap-3'>
              {RentalStatus.Completed && <p className='bg-green-100 px-3.5 py-0.5 rounded-3xl'>{rentalDetail.status}</p>}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-10 w-1/2'>
            <div>
              <p className='text-gray-700 text-sm'>Total Price</p>
              <h3 className='text-xl font-bold'>AED {rentalDetail.totalPrice}</h3>
            </div>
            <div>
              <p className='text-gray-700 text-sm'>Total Distance Travelled</p>
              <h3 className='text-xl font-bold'>{rentalDetail.totalDistance} km</h3>
            </div>
            <div>
              <p className='text-gray-700 text-sm'>Start Date and Time</p>
              <h3 className='text-xl font-bold'>{new Date(rentalDetail.startDate).toLocaleString()}</h3>
            </div>
            <div>
              <p className='text-gray-700 text-sm'>End Date and Time</p>
              <h3 className='text-xl font-bold'>{new Date(rentalDetail.endDate).toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className='flex gap-5 w-1/2'>
          {/* Customer */}
          <div className='w-1/2 flex flex-col gap-1 border-2 border-gray-200 rounded-2xl p-5'>
            <div className='flex items-center gap-2'>
              <FaUser />
              <h2 className='font-semibold text-lg'>Customer Details</h2>
            </div>
            <div>
              <h3 className='text-lg'>{rentalDetail.user.fullName}</h3>
            </div>
            <div>
              <h3 className='text-lg'>{rentalDetail.user.email.length > 0 ? rentalDetail.user.email : "-"}</h3>
            </div>
            <div>
              <h3 className='text-lg'>{rentalDetail.user.phoneNumber}</h3>
            </div>
          </div>
          {/* Tariff & Insurance */}
          <div className='w-1/2 border-2 border-gray-200 rounded-2xl p-5'>
            <div className='flex items-center gap-2'>
              <IoCube size={'1.2rem'} />
              <h2 className='font-semibold text-lg'>Tariff & Insurance</h2>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default RentalDetail
