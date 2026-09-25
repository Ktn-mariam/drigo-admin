"use client"
import Kpi from '@/components/Kpi'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdCarRental } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { MdOnlinePrediction } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { IoWarning } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa6";
import { BsFillCreditCardFill } from "react-icons/bs";
import { BsPersonFillCheck } from "react-icons/bs";
import { MdTimer } from "react-icons/md";
import { FaApple } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
import { IoTimer } from "react-icons/io5";

type KpiData = {
  totalMembers: number,
  totalCars: number,
  activeRentals: number,
  activeReservations: number,
  openSupportTickets: number,
  totalDeliveryDrivers: number,
  onlineDrivers: number,
  todayRevenue: number,
  monthlyRevenue: number,
  totalRevenue: number,
  totalDebt: number,
  stripeMonthlyRevenue: number,
  stripeTotalRevenue: number,
  averageVerificationTimeHours: number,
  pendingVerificationCount: number,
  iosUsers: number,
  androidUsers: number,
  approvedMembers: number,
  totalDebtBreakdown: {
    customer: number,
    company: number
  }
}

function KPIs() {
  const router = useRouter();
  const [kpiData, setKpiData] = useState<KpiData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/dashboard/kpis', { credentials: "include" });
        const data = await response.json();
        console.log('KPI data:', data);

        if (data.status === 401) {
          router.push('/login');
        }

        setKpiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-6 gap-4">
      {kpiData?.totalMembers !== undefined && (
        <Kpi title="Total Members" value={kpiData.totalMembers}>
          <FaUser size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.totalCars !== undefined && (
        <Kpi title="Total Cars" value={kpiData.totalCars}>
          <FaCar size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.activeRentals !== undefined && (
        <Kpi title="Active Rentals" value={kpiData.activeRentals}>
          <MdCarRental size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.activeReservations !== undefined && (
        <Kpi title="Active Reservations" value={kpiData.activeReservations}>
          <FaUserLock size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.openSupportTickets !== undefined && (
        <Kpi title="Open Support Tickets" value={kpiData.openSupportTickets}>
          <IoTicket size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.totalDeliveryDrivers !== undefined && (
        <Kpi title="Total Delivery Drivers" value={kpiData.totalDeliveryDrivers}>
          <FaTruck size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.onlineDrivers !== undefined && (
        <Kpi title="Online Drivers" value={kpiData.onlineDrivers}>
          <MdOnlinePrediction size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.todayRevenue !== undefined && (
        <Kpi title="Today's Revenue" value={`AED ${kpiData.todayRevenue}`}>
          <FaMoneyBill size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.monthlyRevenue !== undefined && (
        <Kpi title="Monthly Revenue" value={`AED ${kpiData.monthlyRevenue}`}>
          <FaMoneyBillTrendUp size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.totalRevenue !== undefined && (
        <Kpi title="Total Revenue" value={`AED ${kpiData.totalRevenue}`}>
          <GiMoneyStack size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.totalDebt !== undefined && (
        <Kpi title="Total Debt" value={`AED ${kpiData.totalDebt}`}>
          <IoWarning size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.stripeMonthlyRevenue !== undefined && (
        <Kpi title="Stripe Monthly Revenue" value={`AED ${kpiData.stripeMonthlyRevenue}`}>
          <FaCreditCard size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.stripeTotalRevenue !== undefined && (
        <Kpi title="Stripe Total Revenue" value={`AED ${kpiData.stripeTotalRevenue}`}>
          <FaCreditCard size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.averageVerificationTimeHours !== undefined && (
        <Kpi title="Avg Verification Time" value={`${kpiData.averageVerificationTimeHours} Hours`}>
          <IoTimer size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.pendingVerificationCount !== undefined && (
        <Kpi title="Pending Verification Count" value={kpiData.pendingVerificationCount}>
          <MdTimer size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.iosUsers !== undefined && (
        <Kpi title="iOS Users" value={kpiData.iosUsers}>
          <FaApple size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.androidUsers !== undefined && (
        <Kpi title="Android Users" value={kpiData.androidUsers}>
          <DiAndroid size={40} className="text-gray-800" />
        </Kpi>
      )}
      {kpiData?.approvedMembers !== undefined && (
        <Kpi title="Approved Members" value={kpiData.approvedMembers}>
          <BsPersonFillCheck size={40} className="text-gray-800" />
        </Kpi>
      )}
    </div>
  )
}

export default KPIs
