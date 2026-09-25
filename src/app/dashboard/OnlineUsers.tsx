"use client"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { RiMapPinUserFill } from "react-icons/ri";
import dynamic from "next/dynamic";
import { FaAndroid } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { MdOnlinePrediction } from "react-icons/md";

import { renderToStaticMarkup } from "react-dom/server";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

type UserDataType = {
  userId: string,
  fullName: string,
  platform: string,
  latitude: number,
  longitude: number,
  lastLoginAt: string
}

import {
  Marker,
  Tooltip,
  Popup
} from "react-leaflet";
import L from "leaflet";

type CustomMapMarkerForOnlineUsersType = {
  userData: UserDataType[]
}


const mapPinIcon = L.divIcon({
  html: renderToStaticMarkup(
    <RiMapPinUserFill
      style={{
        color: "#232E83",
        fontSize: "38px",
        stroke: "white",
        strokeWidth: 0.7,
        filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.4))",
      }}
    />
  ),
  className: "",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

export const CustomMapMarkersForOnlineUsers = ({ userData }: CustomMapMarkerForOnlineUsersType) => {
  return (
    <div>
      {userData.map((userInfo) => <Marker icon={mapPinIcon} position={[userInfo.latitude, userInfo.longitude]}>
        <Tooltip permanent direction="top" offset={[0, -38]}>
          <div className='flex flex-col items-center'>
            <div className='flex items-center gap-1'>
              {userInfo.platform === "Android" ? <FaAndroid size={15} /> : <FaApple size={15} />}
              <div className='font-bold'>{userInfo.fullName}</div>
            </div>
            <div>
              <div className='text-center'>Last login at <br />{new Date(userInfo.lastLoginAt).toLocaleString()}</div>
            </div>
          </div>
        </Tooltip>
      </Marker>)
      }
    </div>
  )
}

function OnlineUsers() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserDataType[] | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/dashboard/online-users', { credentials: "include" });
        const data = await response.json();
        console.log('online user data:', data);

        if (data.status === 401) {
          router.push('/login');
        }

        setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='border border-gray-300 rounded-lg p-4 w-1/2'>
      <h1 className="text-lg font-bold mb-4 text-center">Users online & their Location</h1>
      <div>
        {userData &&
          <Map>
            <CustomMapMarkersForOnlineUsers userData={userData} />
          </Map>}
      </div>
      <div className='flex gap-2 items-center justify-center'>
        <MdOnlinePrediction size={25} />
        <p><span className='font-bold'>{userData?.length} users</span> are currently online</p>
      </div>
    </div>
  )
}

export default OnlineUsers
