"use client"
import FleetByCity from './FleetByCity'
import Trends from './Trends'
import KPIs from './KPIs'
import dynamic from "next/dynamic";
import Table from '@/components/Table';
import SupportMessages from './SupportMessages';
import RecentActivity from './RecentActivity';

const OnlineUsers = dynamic(
  () => import("@/app/dashboard/OnlineUsers"),
  {
    ssr: false,
  }
);


function Dashboard() {
  return (
    <div className="flex flex-col">
      <KPIs />
      <div className="flex gap-4 mt-4 items-start">
        <Trends />
        <FleetByCity />
        <SupportMessages />
      </div>
      <div className='flex gap-4 items-start'>
        <OnlineUsers />
        <RecentActivity />
      </div>
    </div>
  )
}

export default Dashboard
