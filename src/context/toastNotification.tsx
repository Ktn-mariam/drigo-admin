"use client"
import React, { createContext, useState } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { FaCircleInfo } from "react-icons/fa6";


const ToastNotificationsContext = createContext({
  showToast: (message: string, type: string) => { }
})

export const ToastNotificationsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const showToast = (message: string, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  let contextValue = {
    showToast
  }

  return (
    <ToastNotificationsContext.Provider value={contextValue}>
      <div className={` pl-5 pr-16 py-3 rounded-md shadow-md flex items-center gap-3 fixed top-10 right-4 border-2 border-l-8 border-green-400 bg-green-100 transition-all duration-500 ease-out ${toast && toast.type === "success" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
        <FaCircleCheck className='text-green-600' size={'1.2rem'} />
        <p>{toast?.message}</p>
      </div>
      <div className={` pl-5 pr-16 py-3 rounded-md shadow-md flex items-center gap-3 fixed top-10 right-4 border-2 border-l-8 border-red-400 bg-red-100 transition-all duration-500 ease-out ${toast && toast.type === "error" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
        <FaCircleXmark className='text-red-600' size={'1.2rem'} />
        <p>{toast?.message}</p>
      </div>
      <div className={` pl-5 pr-16 py-3 rounded-md shadow-md flex items-center gap-3 fixed top-10 right-4 border-2 border-l-8 border-amber-400 bg-amber-100 transition-all duration-500 ease-out ${toast && toast.type === "alert" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
        <IoWarning className='text-amber-600' size={'1.2rem'} />
        <p>{toast?.message}</p>
      </div>
      <div className={` pl-5 pr-16 py-3 rounded-md shadow-md flex items-center gap-3 fixed top-10 right-4 border-2 border-l-8 border-sky-400 bg-sky-100 transition-all duration-500 ease-out ${toast && toast.type === "information" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
        <FaCircleInfo className='text-sky-600' size={'1.2rem'} />
        <p>{toast?.message}</p>
      </div>
      {children}
    </ToastNotificationsContext.Provider>
  )
}

export default ToastNotificationsContext