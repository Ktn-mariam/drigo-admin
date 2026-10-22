"use client"
import { CustomerDetail } from '@/types/Customer';
import { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { LuDot } from "react-icons/lu";
import { MdVerifiedUser } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { HiMiniUsers } from "react-icons/hi2";
import { FaMoneyCheck } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { TbFaceId } from "react-icons/tb";
import Document from './Document';

const CustomerDetailPage = () => {
  const params = useParams();
  const id = params.id;
  const [customerDetail, setCustomerDetail] = useState<CustomerDetail | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/users/${id}`, { credentials: "include" });
        const data = await response.json();
        console.log('customer data:', data);

        // if (data.status === 401) {
        //   router.push('/login');
        // }

        setCustomerDetail(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className='mx-20 my-10'>
      {/* <div>Hi</div> */}
      {customerDetail &&
        <div className='flex flex-col gap-5'>
          <div className='border-2 border-gray-200 rounded-2xl p-5'>
            <div className='flex items-center gap-5 border-b-2 border-gray-200 p-5'>
              <div className='h-32 w-32'>
                <img className='h-full w-full rounded-full' src={customerDetail.profilePhotoUrl} alt="Hi" />
              </div>
              <div className='flex flex-col gap-2 mb-3'>
                <p className='text-sm font-semibold'>CUSTOMER ID# {customerDetail.id}</p>
                <div className='flex items-end gap-3'>
                  <h1 className='text-4xl font-semibold'>{customerDetail.fullName}</h1>
                </div>
                <div className='flex gap-1 text-sm items-center'>
                  {customerDetail.userType === "VIP" && <div className='font-semibold text-sm bg-purple-100 px-3 py-0.5 w-fit rounded-2xl'>{customerDetail.userType}</div>}
                  {customerDetail.userType === "Business" && <div className='font-semibold text-sm bg-green-100 px-3 py-0.5 w-fit rounded-2xl'>{customerDetail.userType}</div>}
                  {customerDetail.userType === "Standard" && <div className='font-semibold text-sm bg-blue-100 px-3 py-0.5 w-fit rounded-2xl'>{customerDetail.userType}</div>}
                  {customerDetail.isApproved &&
                    <div className='flex gap-1 items-center'>
                      <LuDot />
                      <div className='font-semibold text-sm bg-blue-100 px-3 py-0.5 w-fit rounded-2xl'>Approved</div>
                    </div>
                  }
                  {customerDetail.isVerified &&
                    <div className='flex gap-1 items-center'>
                      <LuDot />
                      <div className='flex items-center gap-1 bg-green-100 px-3 py-0.5 w-fit rounded-2xl'>
                        <MdVerifiedUser className='text-green-700' size={'0.9rem'} />
                        <div className='font-semibold text-sm'>Verified</div>
                      </div>
                    </div>
                  }
                  {customerDetail.isBlocked &&
                    <div className='flex gap-1 items-center'>
                      <LuDot />
                      <div className='font-semibold text-sm bg-gray-100 px-3 py-0.5 w-fit rounded-2xl'>Blocked</div>
                    </div>
                  }
                  {customerDetail.isDeleted &&
                    <div className='flex gap-1 items-center'>
                      <LuDot />
                      <div className='font-semibold text-sm bg-gray-200 px-3 py-0.5 w-fit rounded-2xl'>Deleted</div>
                    </div>}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-5 p-5'>
              <div className='flex items-center gap-32'>
                <div>
                  <HiMiniUsers size={'1.5rem'} />
                  <div>Referred Users</div>
                  <h3 className='font-semibold text-xl'>{customerDetail.referralDetail.referredCount}</h3>
                </div>
                <div>
                  <IoWallet size={'1.5rem'} />
                  <div>Bonus Balance</div>
                  <h3 className='font-semibold text-xl'>{customerDetail.bonusBalance}</h3>
                </div>
                <div>
                  <FaMoneyCheck size={'1.5rem'} />
                  <div>Bonus Earned</div>
                  <h3 className='font-semibold text-xl'>{customerDetail.referralDetail.bonusEarned}</h3>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-bold text-lg'>Contact Information</h3>
                <div className='flex items-center gap-5'>
                  <MdEmail size={'1.5rem'} />
                  <div className='flex flex-col gap-1'>
                    <div className='text-xs'>Email</div>
                    <p className='text-lg font-semibold'>{customerDetail.email}</p>
                  </div>
                </div>
                <div className='flex items-center gap-5'>
                  <FaPhone size={'1.5rem'} />
                  <div className='flex flex-col gap-1'>
                    <div className='text-xs'>Phone</div>
                    <p className='text-lg font-semibold'>{customerDetail.phoneCountryCode} {customerDetail.phoneNumber.slice(2)}</p>
                  </div>
                </div>
                <div className='flex items-center gap-5'>
                  <BsCalendar2DateFill size={'1.5rem'} />
                  <div className='flex flex-col gap-1'>
                    <div className='text-xs'>Date of Birth</div>
                    <p className='text-lg font-semibold'>{new Date(customerDetail.birthDate).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='border-2 border-gray-200 rounded-2xl p-5'>
            <h3 className='font-bold text-lg mb-5'>Document Verification</h3>
            <div className='grid grid-cols-2 gap-5'>
              {customerDetail.passportDetail && <Document documentDetails={customerDetail.passportDetail} documentType='Passport' />}
              {customerDetail.driverLicenseDetail && <Document documentDetails={customerDetail.driverLicenseDetail} documentType={`Driver's License`} />}
              {customerDetail.nationalIdentityDetail && <Document documentDetails={customerDetail.nationalIdentityDetail} documentType='National ID' />}
              <div className='border-2 border-gray-200 rounded-2xl p-5 flex gap-3 flex-col'>
                <div className='flex items-center justify-between'>
                  <div className='flex gap-2 items-center'>
                    <TbFaceId size={'1.5rem'} />
                    <h3 className='font-semibold text-lg'>Face Verification</h3>
                  </div>
                  {customerDetail.faceVerifyDetail?.isVerified && <div className='flex items-center gap-1 bg-green-100 px-3 py-0.5 w-fit rounded-2xl'>
                    <MdVerifiedUser className='text-green-700' size={'0.9rem'} />
                    <div className='font-semibold text-sm'>Verified</div>
                  </div>}
                  {!customerDetail.faceVerifyDetail?.isVerified && <div className='font-semibold text-sm bg-gray-200 px-3 py-0.5 w-fit rounded-2xl'>{customerDetail.faceVerifyDetail?.status}</div>}
                </div>
                <div>
                  {customerDetail.faceVerifyDetail?.selfieUrl && <img className='h-49' src={customerDetail.faceVerifyDetail?.selfieUrl} alt="" />}
                </div>
                <div>
                  <p>Match Score: </p>
                  {customerDetail.faceVerifyDetail?.verifiedAt && <div className='w-1/2'>Verified at: <span className='font-semibold'>{new Date(customerDetail.faceVerifyDetail?.verifiedAt).toLocaleString()}</span></div>}
                </div>
              </div>
            </div>
          </div>
          <div className='border-2 border-gray-200 rounded-2xl p-5'>
            <h3 className='font-bold text-lg mb-5'>Document Verification</h3>

          </div>
        </div >}
    </div >
  )
}

export default CustomerDetailPage
