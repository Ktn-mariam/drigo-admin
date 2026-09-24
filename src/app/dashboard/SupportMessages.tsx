"use client"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Table from '@/components/Table';
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";

type SupportMessagesType = {
  id: number,
  supportId: number,
  message: string,
  createdBy: string,
  isOperator: boolean,
  createdAt: string
}

function SupportMessages() {
  const router = useRouter()
  const [supportMessages, setSupportMessages] = useState<SupportMessagesType[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/dashboard/recent-activity', { credentials: "include" });
        const data = await response.json();
        console.log('support messages:', data);

        if (data.status === 401) {
          router.push('/login');
        }
        setSupportMessages(data.recentSupportMessages)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className='w-1/2 border border-gray-300 rounded-lg p-4'>
      <h1 className="text-lg font-bold mb-4 text-center">Most Recent Messages</h1>
      <div className='flex flex-col gap-4'>
        {supportMessages && supportMessages.map((supportMessage) => {
          return <div className='flex gap-2 items-center'>
            {supportMessage.isOperator ? <div className='rounded-2xl bg-black p-1'>
              <RiCustomerService2Fill size={18} color='white' />
            </div> : <FaCircleUser size={20} />}
            <div className='flex flex-col'>
              <div className='flex gap-4'>
                <p className='font-bold text-blue-950 text-xs'>{supportMessage.createdBy}</p>
                <p className='text-xs'>{new Date(supportMessage.createdAt).toLocaleString()}</p>
              </div>
              <div className='font-semibold'>
                {supportMessage.message}
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default SupportMessages
