"use client"
import { Customer } from '@/types/Customer';
import { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalNoOfPages, setTotalNoOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/users?page=${currentPage}&pageSize=20`, { credentials: "include" });
        const data = await response.json();
        console.log('rental data:', data);

        // if (data.status === 401) {
        //   router.push('/login');
        // }

        setCustomers(data.data);
        setTotalNoOfPages(Math.ceil(data.total / data.pageSize));
        console.log('totalNoOfPages:', totalNoOfPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [currentPage]);
  return (
    <div className='px-20 py-10'>
      <h1 className='text-2xl font-bold mb-4'>Customers</h1>
      <div className='flex flex-col items-center'>
        <table className="table-auto w-full">
          <thead>
            <tr className='border-b border-gray-300'>
              <th scope="col" className='w-1/5 px-3 py-1 text-start text-lg'>TYPE</th>
              <th scope="col" className='w-2/5 px-3 py-1 text-start text-lg'>CUSTOMER</th>
              <th scope="col" className='w-1/5 px-3 py-1 text-start text-lg'>STATUS</th>
              <th scope="col" className='w-1/5 px-3 py-1 text-start text-lg'>ISSUE</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index} className='border-b border-gray-300'>
                <td>
                  {customer.userType === "VIP" && <div className='font-semibold text-sm bg-purple-100 px-3 py-0.5 w-fit rounded-2xl'>{customer.userType}</div>}
                  {customer.userType === "Business" && <div className='font-semibold text-sm bg-green-100 px-3 py-0.5 w-fit rounded-2xl'>{customer.userType}</div>}
                  {customer.userType === "Standard" && <div className='font-semibold text-sm bg-blue-100 px-3 py-0.5 w-fit rounded-2xl'>{customer.userType}</div>}
                </td>
                <td>
                  <div className="py-2 flex flex-col">
                    <div className='flex gap-5 items-center'>
                      <div>
                        <FaRegUserCircle size={'1.5rem'} />
                      </div>
                      <div>
                        <div className='font-semibold text-md'>{customer.fullName}</div>
                        <div className='text-sm'>{customer.email}</div>
                        <div className='flex items-center gap-1'>
                          {customer.phoneNumberConfirmed && <div><GiConfirmed className='text-green-800' /></div>}
                          <div className='text-sm'>{customer.phoneCountryCode} {customer.phoneNumber}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="py-2 flex flex-col gap-1">
                    {customer.isVerified && <div className='font-semibold text-sm bg-green-100 px-3 py-0.5 w-fit rounded-2xl'>Verified</div>}
                    {customer.isApproved && <div className='font-semibold text-sm bg-blue-100 px-3 py-0.5 w-fit rounded-2xl'>Approved</div>}
                    {customer.isBlocked && <div className='font-semibold text-sm bg-gray-100 px-3 py-0.5 w-fit rounded-2xl'>Blocked</div>}
                    {customer.isDeleted && <div className='font-semibold text-sm bg-gray-200 px-3 py-0.5 w-fit rounded-2xl'>Deleted</div>}
                    {!customer.isVerified && !customer.isApproved && !customer.isBlocked && !customer.isDeleted && <div className='font-semibold text-sm bg-gray-200 px-3 py-0.5 w-fit rounded-2xl'>Pending Verification</div>}
                  </div>
                </td>
                <td>
                  <div className="py-2 flex flex-col gap-1">
                    {customer.isDriverLicenseRejected && <div className='font-semibold text-sm bg-red-100 px-3 py-0.5 w-fit rounded-2xl'>Driver's License Rejection</div>}
                    {customer.isFaceRejected && <div className='font-semibold text-sm bg-red-100 px-3 py-0.5 w-fit rounded-2xl'>Face Rejected</div>}
                    {customer.isNationalIdRejected && <div className='font-semibold text-sm bg-red-100 px-3 py-0.5 w-fit rounded-2xl'>National ID Rejected</div>}
                    {customer.isPassportRejected && <div className='font-semibold text-sm bg-red-100 px-3 py-0.5 w-fit rounded-2xl'>Passport Rejected</div>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomersPage
