"use client"
import FleetByCity from './FleetByCity'
import Trends from './Trends'
import KPIs from './KPIs'

function Dashboard() {
  return (
    <div className="flex items-start gap-4 p-4">
      <KPIs />
      <div className="flex flex-col gap-4 w-1/2">
        <Trends />
        <FleetByCity />
      </div>
    </div>
  )
}

export default Dashboard
