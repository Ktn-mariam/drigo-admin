"use client"
import { Customer } from '@/types/Customer';
import { useEffect, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdVerifiedUser } from "react-icons/md";
import { MdOutlineVerified } from "react-icons/md";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalNoOfPages, setTotalNoOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterOption, setFilterOption] = useState<string | null>(null)
  const [searchText, setSearchText] = useState<string | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        if (searchText && searchText.trim()) {
          params.set("search", searchText.trim());
        }

        if (filterOption) {
          params.set("approvalStatus", filterOption);
        }

        params.set("page", String(currentPage));

        const response = await fetch(`http://localhost:4000/api/admin/users?${params.toString()}`, { credentials: "include" });
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
  }, [currentPage, filterOption, searchText]);

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
    <div className='px-20 py-10'>
      <h1 className='text-2xl font-bold mb-4'>Customers</h1>
      <div className='flex flex-col items-cente gap-10'>
        <div className='flex gap-5 items-center'>
          <div className='flex items-center gap-2 border border-gray-300 border-solid rounded-2xl px-2 py-1 w-full focus-within:border-gray-400 transition-colors focus-within:shadow-xs'>
            <IoIosSearch size={"1.5em"} color="lightgray" />
            <input type="text" placeholder='Search by Name, Phone No, or Email...' className='border-none w-full focus:outline-none' onChange={(event) => {
              setSearchText(event.target.value)
            }}></input>
          </div>
          <div className='flex gap-1 w-fit items-center'>
            <label className="whitespace-nowrap" htmlFor="">Approval Status:</label>
            <select onChange={(event) => { setFilterOption(event.target.value); setCurrentPage(1) }} className='border border-gray-300 px-2 py-1 rounded-2xl' id="platform" name="platform">
              <option value="">All statuses</option>
              <option value="approved">Approved</option>
              <option value="blocked">Blocked</option>
              <option value="pending">Verification Pending</option>
            </select>
          </div>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className='border-b border-gray-300'>
              <th scope="col" className='w-1/6 py-1 text-start text-lg'>TYPE</th>
              <th scope="col" className='w-2/6 py-1 text-start text-lg'>CUSTOMER</th>
              <th scope="col" className='w-1/6 py-1 text-start text-lg'>PLATFORM</th>
              <th scope="col" className='w-1/6 py-1 text-start text-lg'>STATUS</th>
              <th scope="col" className='w-1/6 py-1 text-start text-lg'>ISSUE</th>
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
                          {customer.phoneNumberConfirmed && <div className='flex items-center'><MdOutlineVerified className='text-green-800' size={'1rem'} /></div>}
                          <div className='text-sm'>{customer.phoneCountryCode} {customer.phoneNumber.slice(2, customer.phoneNumber.length)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='text-sm font-semibold'>{customer.platform}</div>
                </td>
                <td>
                  <div className="py-2 flex flex-col gap-1">
                    {customer.isVerified &&
                      <div className='flex items-center gap-1 bg-green-100 px-3 py-0.5 w-fit rounded-2xl'>
                        <MdVerifiedUser className='text-green-700' size={'0.9rem'} />
                        <div className='font-semibold text-sm'>Verified</div>
                      </div>
                    }
                    {customer.isApproved && <div className='font-semibold text-sm bg-blue-100 px-3 py-0.5 w-fit rounded-2xl'>Approved</div>}
                    {customer.isBlocked && <div className='font-semibold text-sm bg-gray-100 px-3 py-0.5 w-fit rounded-2xl'>Blocked</div>}
                    {customer.isDeleted && <div className='font-semibold text-sm bg-gray-200 px-3 py-0.5 w-fit rounded-2xl'>Deleted</div>}
                    {!customer.isVerified && !customer.isApproved && !customer.isBlocked && !customer.isDeleted && <div className='font-semibold text-sm bg-gray-200 px-3 py-0.5 w-fit rounded-2xl'>Verification Pending</div>}
                  </div>
                </td>
                <td>
                  <div className="py-2 flex flex-col gap-1">
                    {customer.isDriverLicenseRejected && <div className='font-semibold text-sm bg-red-100 px-3 py-0.5 w-fit rounded-2xl'>Driver's License Rejected</div>}
                    {customer.isFaceRejected && <div className='font-semibold text-sm bg-red-100 px-3 py-0.5 w-fit rounded-2xl'>Face Rejected</div>}
                    {customer.isNationalIdRejected && <div className='font-semibold text-sm bg-red-100 px-3 py-0.5 w-fit rounded-2xl'>National ID Rejected</div>}
                    {customer.isPassportRejected && <div className='font-semibold text-sm bg-red-100 px-3 py-0.5 w-fit rounded-2xl'>Passport Rejected</div>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex mb-5 items-center justify-center'>
          <div className='flex mt-5 items-center gap-5'>
            <button className='flex gap-1 items-center hover:bg-gray-200 px-2 py-1 rounded-md border-2 border-gray-200' onClick={handlePageNewer}>
              <FaCaretLeft size={20} />
              <div className='leading-none'>Back</div>
            </button>
            <div>Page {currentPage} of {totalNoOfPages}</div>
            <button className='flex gap-1 items-center hover:bg-gray-200 px-2 py-1 rounded-md border-2 border-gray-200' onClick={handlePageOlder}>
              <FaCaretRight size={20} />
              <div className='leading-none'>Next</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomersPage
