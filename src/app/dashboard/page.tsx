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
    <div className="flex items-start gap-4 p-4">
      <KPIs />
      <div className="flex flex-col gap-4 w-1/2">
        <Trends />
        <FleetByCity />
        <OnlineUsers />
        <SupportMessages />
        <RecentActivity />
      </div>
    </div>
  )
}

export default Dashboard
