"use client"
import React from 'react'

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
    <div className='border-2 border-gray-200 py-2 px-3 rounded-lg w-98'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-lg'>{car.brandName} {car.modelName}</h1>
        <div className='italic'>
          {(car.isActive === true && car.activeRentalId === null) && <p>Available</p>}
          {(car.activeRentalId !== null) && <p>Rented</p>}
          {!car.isActive && <p>Inactive</p>}
        </div>
      </div>
    </div>
  )
}

export default CarCard
