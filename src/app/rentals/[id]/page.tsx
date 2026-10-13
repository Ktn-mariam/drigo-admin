"use client"
import { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { RentalDetailType, RentalStatus, RentalPaymentType, RentalRouteType } from '@/types/Rental';
import { LuDot } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoCube } from "react-icons/io5";
import { FaShieldAlt } from "react-icons/fa";
import Table from '@/components/Table';
import Map from '@/components/Map';
import {
  Marker,
  Tooltip,
  Popup,
  Circle
} from "react-leaflet";
import L from "leaflet";
import { FaRegCircleDot } from "react-icons/fa6";
import { renderToStaticMarkup } from "react-dom/server";

const mapPinIcon = L.divIcon({
  html: renderToStaticMarkup(
    <FaRegCircleDot
      style={{
        color: "#232E83",
        fontSize: "16px",
        stroke: "white",
        strokeWidth: 0.7,
        filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))",
      }}
    />
  ),
  className: "",
  iconSize: [16, 16],
  iconAnchor: [8, 16],
  popupAnchor: [0, -16],
});

type CustomMapMarkersForRentalRoutePropsType = {
  routeCoordinates: {
    latitude: number,
    longitude: number,
    at: string
  }[]
}


export const CustomMapMarkersForRentalRoute = ({ routeCoordinates }: CustomMapMarkersForRentalRoutePropsType) => {
  return (
    <div>
      {routeCoordinates.map((coordinate, index) => <Marker key={index} icon={mapPinIcon} position={[coordinate.latitude, coordinate.longitude]}>
        {/* <Tooltip permanent direction="top" offset={[0, -32]}>
          <div className='flex flex-col items-center'>
            <p className='uppercase'>{}</p>
            <p>{gasStation.name}</p>
          </div>
        </Tooltip> */}
      </Marker>)
      }
    </div>
  )
}

const RentalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [rentalDetail, setRentalDetail] = useState<RentalDetailType | null>(null);
  const [payments, setPayments] = useState<RentalPaymentType[] | null>(null);
  const [routeData, setRouteData] = useState<RentalRouteType | null>(null);

  useEffect(() => {
    const fetchRentalDetail = async () => {
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

    const fetchPayments = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/rentals/${id}/payments`, { credentials: "include" });
        const data = await response.json();
        console.log('Payment data:', data);

        // if (data.status === 401) {
        //   router.push('/login');
        // }

        setPayments(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const fetchRentalRoute = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/rentals/${id}/route`, { credentials: "include" });
        const data = await response.json();
        console.log('Payment data:', data);

        // if (data.status === 401) {
        //   router.push('/login');
        // }

        setRouteData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }


    fetchRentalDetail();
    fetchPayments()
    fetchRentalRoute()
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
        <div className='flex gap-5 w-full'>
          {/* Customer */}
          <div className='w-1/3 flex flex-col gap-2 border-2 border-gray-200 rounded-2xl p-5'>
            <div className='flex items-center gap-2'>
              <FaUser />
              <h2 className='font-semibold text-lg'>Customer Details</h2>
            </div>
            <div className='mt-3'>
              <h3 className='font-semibold'>{rentalDetail.user.fullName}</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Email:</h3>
              <h3>{rentalDetail.user.email.length > 0 ? rentalDetail.user.email : "-"}</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Phone No:</h3>
              <h3>{rentalDetail.user.phoneNumber}</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Customer bonus balance:</h3>
              <h3>{rentalDetail.customerBonusBalance}</h3>
            </div>
          </div>
          {/* Tariff & Insurance */}
          <div className='w-1/3 flex flex-col gap-2 border-2 border-gray-200 rounded-2xl p-5'>
            <div className='flex items-center gap-2'>
              <IoCube size={'1.2rem'} />
              <h2 className='font-semibold text-lg'>Tariff</h2>
            </div>
            <div className='mt-3'>
              <h3 className='font-semibold'>{rentalDetail.tariff.packageName} Package</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Active Price:</h3>
              <h3>AED {rentalDetail.tariff.activePrice}</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Phone No:</h3>
              <h3>{rentalDetail.tariff.unitCount} {rentalDetail.tariff.timeUnit}</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Included Distance:</h3>
              <h3>{rentalDetail.tariff.includedDistance} km included</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Customer bonus balance:</h3>
              <h3>{rentalDetail.customerBonusBalance}</h3>
            </div>
          </div>
          <div className='w-1/3 flex flex-col gap-2 border-2 border-gray-200 rounded-2xl p-5'>
            <div className='flex items-center gap-2'>
              <FaShieldAlt size={'1.2rem'} />
              <h2 className='font-semibold text-lg'>Insurance</h2>
            </div>
            <div className='mt-3'>
              <h3 className='font-semibold'>{rentalDetail.insurance.name} Insurance</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Daily Price:</h3>
              <h3>AED {rentalDetail.insurance.dailyPrice}/day</h3>
            </div>
            <div className='flex justify-between'>
              <h3>Deductible:</h3>
              <h3>AED {rentalDetail.insurance.deductible} deductible</h3>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <div className='flex flex-col gap-3'>
            <h1 className='font-semibold text-lg'>Start Photos</h1>
            <div className='grid grid-cols-2 gap-5'>
              <div className='flex items-center justify-center '><img className='w-full' src={rentalDetail.startPhotoUrls[0]} alt="" /></div>
              <div className='flex items-center justify-center'><img className='w-full' src={rentalDetail.startPhotoUrls[1]} alt="" /></div>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <h1 className='font-semibold text-lg'>End Photos</h1>
            <div className='grid grid-cols-2 gap-5'>
              <div className='flex items-center justify-center'><img className='w-full' src={rentalDetail.endPhotoUrls[0]} alt="" /></div>
              <div className='flex items-center justify-center'><img className='w-full' src={rentalDetail.endPhotoUrls[1]} alt="" /></div>
            </div>
          </div>
        </div>
        <div className='flex gap-5'>
          <div className='w-2/3 flex flex-col gap-5'>
            {payments && <div className='w-full'>
              <h1 className='font-semibold text-lg mb-3'>Payments Made</h1>
              <Table headings={['Amount', 'Transaction Type', 'serviceFee', 'Is Final Payment', 'Start Period', 'End Period']} dataRows={payments.map((payment) => { return [`${payment.currency} ${payment.amount}`, `${payment.transactionType}`, `${payment.currency} ${payment.serviceFee}`, `${payment.isFinalPayment}`, `${new Date(payment.periodStart).toLocaleString()}`, `${new Date(payment.periodEnd).toLocaleString()}`] })} href={null} />
            </div>}
            {rentalDetail.debts.length > 0 && <div className='w-full'>
              <h1 className='font-semibold text-lg mb-3'>Debts</h1>
              <Table headings={['Type', 'Description', 'Amount', 'Paid', 'Created At']} dataRows={rentalDetail.debts.map((debt) => { return [`${debt.type}`, `${debt.description}`, `${debt.currency} ${debt.amount}`, `${debt.isPaid}`, `${new Date(debt.createdAt).toLocaleString()}`] })} href={null} />
            </div>}
            {rentalDetail.userRentalHistory.length > 0 && <div className='w-full'>
              <h1 className='font-semibold text-lg mb-3'>User Rental History</h1>
              <Table headings={['Status', 'Start Date', 'End Date', 'Total Price']} dataRows={rentalDetail.userRentalHistory.map((history) => { return [`${history.status}`, `${new Date(history.startDate).toLocaleString()}}`, `${new Date(history.endDate).toLocaleString()}`, `AED ${history.totalPrice}`] })} href={null} />
            </div>}
          </div>
          <div className='w-1/3'>
            <h1 className='font-semibold text-lg mb-3'>Rental Route</h1>
            {routeData && <div className='w-full h-96'>
              <Map center={{ latitude: routeData?.coordinates[0].latitude, longitude: routeData?.coordinates[0].longitude }}>
                <CustomMapMarkersForRentalRoute routeCoordinates={routeData.coordinates} />
              </Map >
            </div>}
          </div>
        </div>
      </div>}
    </div>
  )
}

export default RentalDetail
