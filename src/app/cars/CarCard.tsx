"use client"
import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import Link from "next/link";

type CarType = {
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

const CarCard = ({ car }: { car: CarType }) => {
  console.log(car);

  return (
    <div className='border-2 border-gray-200 py-2 px-3 rounded-lg flex flex-col gap-1'>
      <div className='flex justify-between items-end'>
        <h1 className='font-bold text-xl'>{car.brandName} {car.modelName}</h1>
        <div className='italic'>
          {(car.isActive === true && car.activeRentalId === null) && <p className='text-green-800'>Available</p>}
          {(car.activeRentalId !== null) && <p>Rented</p>}
          {!car.isActive && <p>Inactive</p>}
        </div>
      </div>
      <div className='flex gap-2'>
        <p className='font-semibold text-gray-500'>Made in <span className='font-semibold text-black'>{car.manufactureYear}</span> | </p>
        <div className='flex gap-2 items-center'>
          <p className='font-semibold'>{car.colorName}</p>
          <div style={{ backgroundColor: car.colorHexCode }} className='w-4 h-4 border border-black leading-none' />
        </div>
      </div>
      <div className='flex justify-between mt-2'>
        <div className='flex gap-1 items-center'>
          <FaLocationDot color='grey' />
          <p className='font-semibold text-gray-500'>End Trip Cities</p>
        </div>
        <div className='flex gap-2'>
          {car.endTripAvailableCities.map((city, index) => {
            return <p key={index} className='font-semibold text-black'>{city} {`${index !== car.endTripAvailableCities.length - 1 ? '|' : ''}`}</p>
          })}
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-1 items-center'>
          <FaIdCard color='grey' />
          <p className='font-semibold text-gray-500'>Plate</p>
        </div>
        <p className='font-semibold text-black'>{car.plateNumber}</p>
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-1 items-center'>
          <BsFillFuelPumpFill color='grey' />
          <p className='font-semibold text-gray-500'>Fuel</p>
        </div>
        <p className='font-semibold text-black'>{car.fuelLevel.toFixed(2)}%</p>
      </div>
      <div className='mt-2'>
        <Link href={`/cars/${car.id}`}>
          <button className='text-center w-full border-2 border-gray-300 py-1 hover:cursor-pointer rounded-md'>View Details</button>
        </Link>
      </div>
    </div>
  )
}

export default CarCard
