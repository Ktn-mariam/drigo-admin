"use client"
import React from 'react'
import { FaUser } from "react-icons/fa";

const Kpi = ({ children, title, value }: { children: React.ReactNode; title: string; value: string | number }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 flex gap-4 items-center shadow-sm">
      <div className="w-10">
        {children}
      </div>
      <div>
        <h5 className="text-sm font-semibold text-gray-600">{title}</h5>
        <h1 className="font-bold">{value}</h1>
      </div>
    </div>
  )
}

export default Kpi
