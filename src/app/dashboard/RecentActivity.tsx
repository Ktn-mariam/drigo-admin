import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { MdMoneyOff } from "react-icons/md";
import { FaCarOn } from "react-icons/fa6";
import { FaCar } from "react-icons/fa6";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

type ActivityType = {
  id: number,
  type: string,
  message: string,
  refId: number,
  at: string
}

function RecentActivity() {
  const router = useRouter()
  const [activities, setActivities] = useState<ActivityType[] | null>(null)
  const [displayActivities, setDisplayActivities] = useState<ActivityType[] | null>(null)
  const [page, setPage] = useState(1)
  const [indexes, setIndexes] = useState({ startIndex: 1, endIndex: 30 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/dashboard/recent-activity', { credentials: "include" });
        const data = await response.json();
        console.log('data:', data);

        if (data.status === 401) {
          router.push('/login');
        }
        setActivities(data.activity)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const itemsPerPage = 15;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setIndexes({ startIndex, endIndex })

    if (activities) {
      const pageItems = activities?.slice(startIndex, endIndex);
      setDisplayActivities(pageItems)
    }
  }, [activities, page])

  return (
    <div className='border border-gray-300 rounded-lg p-4 flex flex-col items-center w-1/2'>
      <h1 className="text-lg font-bold mb-4 text-center">Most Recent Activity</h1>
      <div>
        {displayActivities && displayActivities.map((activity) => {
          return (
            <div className='flex items-center gap-2'>
              <div className='w-4 flex items-center'>
                {activity.type === "Fine" && <MdMoneyOff />}
                {activity.type === "ReservationCreated" && <FaCar size={15} />}
                {activity.type === "ReservationCompleted" && <FaCarOn size={20} />}
              </div>
              <div className='pr-4 py-1'>{new Date(activity.at).toLocaleString()}: <span className='italic'>{activity.message}</span></div>
            </div>
          )
        })}
      </div>
      <div className='flex mt-5 items-center gap-3'>
        <button className='flex gap-1 items-center hover:bg-gray-200 px-2 py-1 rounded-md border-2 border-gray-200' onClick={() => setPage(1)}>
          <FaCaretLeft size={20} />
          <div className='leading-none'>Newer</div>
        </button>
        <div>Showing {indexes.startIndex + 1} - {indexes.endIndex} / {activities?.length}</div>
        <button className='flex gap-1 items-center hover:bg-gray-200 px-2 py-1 rounded-md border-2 border-gray-200' onClick={() => setPage(2)}>
          <FaCaretRight size={20} />
          <div className='leading-none'>Older</div>
        </button>
      </div>
    </div >
  )
}

export default RecentActivity
