"use client"
import React, { useEffect, useState } from 'react'
import CarForm from '../../CarForm'
import { useParams } from "next/navigation";
import { CarDetailType } from '@/types/Car';

const EditCar = () => {
  const { id } = useParams<{ id: string }>();
  const [carDetail, setCarDetail] = useState<CarDetailType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/cars/${id}`, { credentials: "include" });
        const data = await response.json();
        console.log('car data:', data);

        // if (data.status === 401) {
        //   router.push('/login');
        // }

        setCarDetail(data);
        console.log('carDetail:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {carDetail && <CarForm isEditForm={true} carId={id} initialValues={carDetail} />}
    </div>
  )
}

export default EditCar
