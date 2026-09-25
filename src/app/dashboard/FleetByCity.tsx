'use client'
import { useEffect, useState } from 'react'
import { PieChart } from "@/components/PieChart"
import { useRouter } from "next/navigation";

type byCityData = {
  city: string;
  count: number;
}

function FleetByCity() {
  const router = useRouter();
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/dashboard/fleet', { credentials: "include" });
        const data = await response.json();
        console.log('Fetched data:', data);

        if (data.status === 401) {
          router.push('/login');
        }

        const labels = data.byCity.map((item: byCityData) => item.city);
        const fleetData = data.byCity.map((item: byCityData) => item.count);

        setLabels(labels);
        setData(fleetData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="w-1/4 border border-gray-300 rounded-lg p-4 flex flex-col items-center">
      <h1 className="text-lg font-bold mb-4">Number of Cars by City</h1>
      <div className="h-72 w-fit">
        <PieChart labels={labels} data={data} />
      </div>
      <div className="flex gap-3 mt-6">
        <div className="flex gap-1 items-center">
          <div className="h-4 w-4 bg-teal-600"></div>
          <p className="leading-none">Dubai</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="h-4 w-4 bg-teal-800"></div>
          <p className="leading-none" >Abu Dhabi</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="h-4 w-4 bg-amber-800"></div>
          <p className="leading-none">Sharjah</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="h-4 w-4 bg-amber-300"></div>
          <p className="leading-none">Ajman</p>
        </div>
      </div>
    </div>
  )
}

export default FleetByCity
