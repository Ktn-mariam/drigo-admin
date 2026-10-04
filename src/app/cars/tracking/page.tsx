"use client"
import Map from '@/components/Map'
import { useEffect, useState } from 'react'
import {
  Marker,
  Tooltip,
  Popup,
  Circle
} from "react-leaflet";
import L from "leaflet";
import { FaLocationDot } from "react-icons/fa6";
import { renderToStaticMarkup } from "react-dom/server";

type CarTrackingDataType = {
  id: number,
  plateNumber: string,
  brandName: string,
  modelName: string,
  latitude: number,
  longitude: number,
  heading: number,
  speed: number,
  engineOn: boolean,
  online: boolean,
  fuelLevel: number,
  activeRentalId: number | null,
  status: string,
  lastActivityAt: string
}

const mapPinIcon = L.divIcon({
  html: renderToStaticMarkup(
    <FaLocationDot
      style={{
        color: "red",
        fontSize: "32px",
        stroke: "white",
        strokeWidth: 0.7,
        filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))",
      }}
    />
  ),
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

type CustomMapMarkersForCarTrackingPropsType = {
  carTracking: CarTrackingDataType[]
};

export const CustomMapMarkersForCarTracking = ({ carTracking }: CustomMapMarkersForCarTrackingPropsType) => {
  return (
    <div>
      {carTracking.map((trackingData, index) => (
        <Marker key={index} icon={mapPinIcon} position={[trackingData.latitude, trackingData.longitude]}>
          <Tooltip permanent direction="top" offset={[0, -32]}>
            <div className='flex flex-col items-center'>
              <p className='font-semibold'>{trackingData.brandName} {trackingData.modelName}</p>
              <p>Plate No: <span className='font-bold'>{trackingData.plateNumber}</span></p>
            </div>
          </Tooltip>
          <Popup offset={[0, -50]}>
            <h2 className='font-bold text-center mb-3'>VEHICLE INFORMATION</h2>
            <div className='flex flex-col gap-1'>
              <p><span className='font-semibold'>Heading:</span> {trackingData.heading}</p>
              <p><span className='font-semibold'>Speed:</span> {trackingData.speed} km/hr</p>
              {trackingData.engineOn && <p><span className='font-semibold'>Engine:</span> On</p>}
              {!trackingData.engineOn && <p><span className='font-semibold'>Engine:</span> Off</p>}
              {trackingData.online && <p><span className='font-semibold'>Status:</span> Online</p>}
              {!trackingData.online && <p><span className='font-semibold'>Status:</span> Offline</p>}
              {trackingData.fuelLevel && <p><span className='font-semibold'>Fuel Level:</span> {trackingData.fuelLevel}</p>}
              {trackingData.activeRentalId && <p><span className='font-semibold'>Rental ID:</span> {trackingData.activeRentalId}</p>}
              {trackingData.status && <p><span className='font-semibold'>Status:</span> {trackingData.status}</p>}
              {trackingData.lastActivityAt && <p><span className='font-semibold'>Last Activity at:</span> {new Date(trackingData.lastActivityAt).toLocaleString()}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  )
}

const TrackingCars = () => {
  const [carTrackingData, setCarTrackingData] = useState<CarTrackingDataType[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/cars/tracking', { credentials: "include" });
        const data = await response.json();
        console.log('data:', data);

        // if (data.status === 401) {
        //   router.push('/login');
        // }

        setCarTrackingData(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex h-[calc(100vh-32px)] flex-col">
      <h1 className="shrink-0 text-xl font-semibold text-center">
        Car Tracking
      </h1>

      <div className="min-h-0 flex-1 w-full">
        {carTrackingData && (
          <Map center={{ latitude: 25.23193, longitude: 55.319502 }}>
            <CustomMapMarkersForCarTracking
              carTracking={carTrackingData}
            />
          </Map>
        )}
        <div className='text-indigo-800 text-center italic font-semibold'>Click on a marker to further view vehicle information</div>
      </div>
    </div>
  );
}

export default TrackingCars
