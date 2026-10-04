
"use client"
import Table from '../../components/Table';
import { useState, useEffect } from 'react'
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

type RentalDataType = {
  id: number;

  user: {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string | null;
  };

  car: {
    id: number;
    plateNumber: string;
    brand: string;
    model: string;
    color: string;
    year: number;
  };

  route: {
    startLatitude: number;
    startLongitude: number;
    endLatitude: number;
    endLongitude: number;
  };

  startDate: string;
  endDate: string;
  status: string;

  totalPrice: number;
  totalDistance: number;
  discountAmount: number;

  hasTarsContract: boolean;

  userTotalDebt: number;
  nextPaymentTotal: number | null;

  tariffName: string;
  currentPeriod: number;

  totalPaid: number;

  extraKmAmount: number;
  extraKmDistance: number;

  debtPaidAmount: number;
};

const Rentals = () => {
  const [rentals, setRentals] = useState<RentalDataType[]>([]);
  const [totalNoOfPages, setTotalNoOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/rentals?page=${currentPage}&pageSize=20`, { credentials: "include" });
        const data = await response.json();
        console.log('rental data:', data);

        // if (data.status === 401) {
        //   router.push('/login');
        // }

        setRentals(data.data);
        setTotalNoOfPages(Math.ceil(data.total / data.pageSize));
        console.log('totalNoOfPages:', totalNoOfPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [currentPage]);

  const handlePageOlder = () => {
    if (currentPage < totalNoOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageNewer = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold text-center mb-4'>Rentals</h1>
      <div className='w-full flex justify-center'>
        {rentals.length > 0 &&
          <Table headings={['ID', 'Customer', 'Phone No', 'Car', 'Plate No', 'Start Date', 'End Date', 'Status', 'Distance', 'Price']} dataRows={rentals.map(rental => [rental.id, rental.user.fullName, rental.user.phoneNumber, `${rental.car.brand} ${rental.car.model}`, rental.car.plateNumber, `${new Date(rental.startDate).toLocaleString()}`, `${new Date(rental.endDate).toLocaleString()}`, rental.status, `${rental.totalDistance} km`, `AED ${rental.totalPrice}`])} />
        }
      </div>
      <div className='flex mb-5 items-center justify-center'>
        <div className='flex mt-5 items-center gap-3'>
          <button className='flex gap-1 items-center hover:bg-gray-200 px-2 py-1 rounded-md border-2 border-gray-200' onClick={handlePageNewer}>
            <FaCaretLeft size={20} />
            <div className='leading-none'>Newer</div>
          </button>
          {/* <div>Showing {indexes.startIndex + 1} - {indexes.endIndex} / {activities?.length}</div> */}
          <button className='flex gap-1 items-center hover:bg-gray-200 px-2 py-1 rounded-md border-2 border-gray-200' onClick={handlePageOlder}>
            <FaCaretRight size={20} />
            <div className='leading-none'>Older</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Rentals
