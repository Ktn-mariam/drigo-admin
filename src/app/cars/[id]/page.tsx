"use client"
import { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import { MdEventSeat } from "react-icons/md";
import {
  Marker,
  Tooltip,
  Popup,
  Circle
} from "react-leaflet";
import L from "leaflet";
import Map from '@/components/Map';
import { renderToStaticMarkup } from "react-dom/server";
import { FaLocationDot } from "react-icons/fa6";

export type CarFeature = {
  id: number;
  name: string;
  icon: string | null;
};

export type EndTripCity = {
  id: number;
  name: string;
};

export type Location = {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
};

export type ParkingZone = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  isFree: boolean;
  createdAt: string;
};

export type GasStation = {
  id: number;
  name: string;
  brand: string;
  latitude: number;
  longitude: number;
  createdAt: string;
};

export type CarDetailType = {
  id: number;

  // Brand & model
  brandId: number;
  brandName: string;
  modelId: number;
  model: string;
  modelName: string;

  // Basic specifications
  year: number;
  manufactureYear: number;
  bodyType: string;
  engineVolume: string;
  engineCapacity: number;
  engineUnit: string;
  fuelType: string;
  fuelTypeId: number;
  fuelTypeName: string;
  transmission: number;
  seats: number;
  maxSpeed: number;

  // Features
  hasCarplay: boolean;
  keylessEntry: boolean;
  freeParking: boolean;
  freeFuel: boolean;
  insurance: boolean;
  freeInsurance: boolean;

  // Color
  color: string;
  colorId: number;
  colorName: string;

  // Fuel
  fuelPercentage: number;
  fuelLevel: number;
  fuelTankCapacity: number;

  // Location
  locationId: number;
  location: Location;
  locationMapUrl: string;

  // Images
  imageUrl: string;
  thumbnailUrl: string;
  mediumUrl: string;

  // Pricing
  tariffPackageId: number;
  price: number;

  // Distance
  distance: number;

  // Status
  isActive: boolean;
  isUsable: boolean;

  // Features
  carFeatures: CarFeature[];

  // End-trip cities
  endTripAvailableCities: EndTripCity[];

  // Parking & fuel stations
  includedParkingZones: ParkingZone[];
  includedGasStations: GasStation[];

  // Vehicle information
  plateNumber: string;
  chassisNumber: string;
  tarsVehicleDid: string;
  imei: string;

  // Metadata
  createdAt: string;
};

type CustomMapMarkersForCarLocationPropsType = {
  carLocation: Location
}

type CustomMapMarkersForParkingZonesPropsType = {
  parkingZones: ParkingZone[]
}

type CustomMapMarkersForGasStationsPropsType = {
  gasStations: GasStation[]
}

const mapPinIcon = L.divIcon({
  html: renderToStaticMarkup(
    <FaLocationDot
      style={{
        color: "#232E83",
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


export const CustomMapMarkersForCarLocation = ({ carLocation }: CustomMapMarkersForCarLocationPropsType) => {
  return (
    <div>
      <Marker icon={mapPinIcon} position={[carLocation.latitude, carLocation.longitude]}>
        {/* <Tooltip permanent direction="top" offset={[0, -32]}>
          Hi
        </Tooltip> */}
      </Marker>
    </div>
  )
}

export const CustomMapMarkersForParkingZones = ({ parkingZones }: CustomMapMarkersForParkingZonesPropsType) => {
  return (
    <div>
      {parkingZones.map((parkingZone, index) => <Marker key={index} icon={mapPinIcon} position={[parkingZone.latitude, parkingZone.longitude]}>
        <Circle
          center={[parkingZone.latitude, parkingZone.longitude]}
          radius={parkingZone.radiusMeters}
          pathOptions={{
            color: "#232E83",
            fillColor: "#232E83",
            fillOpacity: 0.2,
          }}
        />
        <Tooltip permanent direction="top" offset={[0, -32]}>
          <div className='flex flex-col items-center'>
            <p>{parkingZone.name}</p>
            {parkingZone.isFree && <p>Free Parking</p>}
            {!parkingZone.isFree && <p>Paid Parking</p>}
          </div>
        </Tooltip>
      </Marker>)
      }
    </div>
  )
}

export const CustomMapMarkersForGasStations = ({ gasStations }: CustomMapMarkersForGasStationsPropsType) => {
  return (
    <div>
      {gasStations.map((gasStation, index) => <Marker key={index} icon={mapPinIcon} position={[gasStation.latitude, gasStation.longitude]}>
        <Tooltip permanent direction="top" offset={[0, -32]}>
          <div className='flex flex-col items-center'>
            <p className='uppercase'>{gasStation.brand}</p>
            <p>{gasStation.name}</p>
          </div>
        </Tooltip>
      </Marker>)
      }
    </div>
  )
}


export default function CarDetails() {
  const params = useParams();

  const id = params.id;

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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='mx-20 my-10'>
      {carDetail && <div className='flex flex-col gap-5'>
        <div className='flex items-end gap-3'>
          <h1 className='text-4xl font-semibold'>{carDetail.brandName} {carDetail.modelName}</h1>
          <div className='flex gap-2'>
            {/* Color */}
            <div className='flex items-center gap-1 bg-gray-100 px-1 py-0.5 rounded-3xl'>
              <div className='border border-black h-3 w-3 rounded-2xl' style={{ backgroundColor: `${carDetail.color}` }}></div>
              <p className='text-sm'>{carDetail.colorName}</p>
            </div>
            {/* Seats */}
            <div className='flex items-center gap-1 bg-gray-100 px-1 py-0.5 rounded-3xl'>
              <MdEventSeat />
              <p className='text-sm'>{carDetail.seats}</p>
            </div>
          </div>
        </div>
        <div className='flex gap-5'>
          {/* Features */}
          <div className='w-2/3'>
            <div className='flex flex-col gap-3'>
              <h2 className='font-semibold text-xl'>Features</h2>
              <div className='flex gap-2'>
                {carDetail.carFeatures.map((feature, index) => {
                  return <div className='flex items-center gap-2'>
                    <div className='bg-gray-100 px-3 py-1 rounded-3xl'>{feature.name}</div>
                    <div>
                      {index !== carDetail.carFeatures.length - 1 && <GoDotFill />}
                    </div>
                  </div>
                })}
              </div>
            </div>
          </div>
          <div className='w-1/3 flex flex-col gap-5'>
            {/* Car Location */}
            <div className='border-2 border-gray-200 rounded-xl px-5 py-3 flex flex-col gap-2'>
              <h2 className='font-semibold text-xl'>Car Location</h2>
              <div className='h-60'>
                <Map center={{ latitude: carDetail.location.latitude, longitude: carDetail.location.longitude }}>
                  <CustomMapMarkersForCarLocation carLocation={carDetail.location} />
                </Map>
              </div>
              <div className='flex justify-between'>
                <div>
                  <p className='font-semibold'>{carDetail.location.address}</p>
                  <p>{carDetail.location.city}</p>
                </div>
                <a
                  href={carDetail.locationMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='text-blue-600 underline'
                >
                  View on Maps
                </a>
              </div>
            </div>
            {/* Parking Zone */}
            <div className='border-2 border-gray-200 rounded-xl px-5 py-3 flex flex-col gap-2'>
              <h2 className='font-semibold text-xl'>Included Parking Zones</h2>
              <div className='h-60'>
                <Map center={{ latitude: carDetail.includedParkingZones[0].latitude, longitude: carDetail.includedParkingZones[0].longitude }}>
                  <CustomMapMarkersForParkingZones parkingZones={carDetail.includedParkingZones} />
                </Map>
              </div>
              <div className='flex flex-col'>
                <p className='text-indigo-800 text-sm text-center italic'>The blue region in circle highlights the included parking zone areas.</p>
                <div>
                  <ul className="list-disc pl-5">
                    {carDetail.includedParkingZones.map((parkingZone, index) => {
                      return <li className='font-semibold' key={index}>{parkingZone.name}</li>
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className='border-2 border-gray-200 rounded-xl px-5 py-3 flex flex-col gap-2'>
              <h2 className='font-semibold text-xl'>Included Gas Stations</h2>
              <div className='h-60'>
                <Map center={{ latitude: carDetail.includedGasStations[0].latitude, longitude: carDetail.includedGasStations[0].longitude }}>
                  <CustomMapMarkersForGasStations gasStations={carDetail.includedGasStations} />
                </Map>
              </div>
              <div>
                <ul className="list-disc pl-5">
                  {carDetail.includedGasStations.map((gasStation, index) => {
                    return <li className='font-semibold' key={index}>{gasStation.name}</li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}