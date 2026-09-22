"use client"
import FleetByCity from './FleetByCity'
import Trends from './Trends'

function Dashboard() {
  return (
    <div className="flex gap-4">
      <Trends />
      <FleetByCity />
    </div>
  )
}

export default Dashboard
