"use client"
import React from 'react'
import { CustomerDocument } from '@/types/Customer'
import { IoDocumentText } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";
import { LuTextSelect } from "react-icons/lu";
import { divIcon } from 'leaflet';

const Document = ({ documentDetails, documentType }: { documentDetails: CustomerDocument, documentType: string }) => {
  return (
    <div className='border-2 border-gray-200 rounded-2xl p-5 flex gap-3 flex-col'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <IoDocumentText size={'1.5rem'} />
          <h3 className='font-semibold text-lg'>{documentType}</h3>
        </div>
        {documentDetails.isVerified && <div className='flex items-center gap-1 bg-green-100 px-3 py-0.5 w-fit rounded-2xl'>
          <MdVerifiedUser className='text-green-700' size={'0.9rem'} />
          <div className='font-semibold text-sm'>Verified</div>
        </div>}
        {!documentDetails.isVerified && <div className='font-semibold text-sm bg-gray-200 px-3 py-0.5 w-fit rounded-2xl'>{documentDetails.status}</div>}
      </div>
      <div className='flex gap-2'>
        {documentDetails.frontUrl ? <img src={documentDetails.frontUrl} className='w-1/2' alt="" /> : <div className='border-2 border-gray-200 w-1/2 flex items-center justify-center h-49'>Front Image not uploaded</div>}
        {documentDetails.backUrl ? <img src={documentDetails.backUrl} className='w-1/2' alt="" /> : <div className='border-2 border-gray-200 w-1/2 flex items-center justify-center h-49'>Back Image not uploaded</div>}
      </div>
      <div className='flex items-center gap-2'>
        {<div className='w-1/2'>Uploaded at: {documentDetails.uploadedAt ? <span className='font-semibold'>{new Date(documentDetails.uploadedAt).toLocaleString()}</span> : <span className='font-semibold'>-</span>}</div>}
        {documentDetails.verifiedAt && <div className='w-1/2'>Verified at: <span className='font-semibold'>{new Date(documentDetails.verifiedAt).toLocaleString()}</span></div>}
      </div>
      <div>
        <div className='flex gap-1 items-center'>
          <LuTextSelect size={'1.2rem'} />
          <h3 className='font-bold text-md'>OCR:</h3>
        </div>
        <div className='flex items-center gap-5'>
          <div className='flex flex-col'>
            <div>Number: </div>
            {documentDetails.ocr?.expiryDate && <div>Expiry Date: </div>}
            <div>Full Name: </div>
          </div>
          <div>
            <div className='font-semibold'>{documentDetails.ocr?.number}</div>
            {documentDetails.ocr?.expiryDate ? <div className='font-semibold'>{new Date(documentDetails.ocr?.expiryDate).toLocaleString()}</div> : <div>-</div>}
            <div className='font-semibold'>{documentDetails.ocr?.fullName}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Document
