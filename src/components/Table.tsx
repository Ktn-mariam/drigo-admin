"use client"
import React from 'react'
import Link from "next/link";

const Table = ({ headings, dataRows, href }: { headings: string[], dataRows: (string | number)[][], href: string | null }) => {
  console.log('headings:', headings);
  console.log('dataRows:', dataRows);
  console.log('href:', href);
  return (
    <div className='w-full'>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {headings.map((heading, index) => {
              return <th key={index} scope="col" className='border-2 border-gray-200 px-3 py-1'>{heading}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((dataRow, index) => (
            <tr key={index}>
              {dataRow.map((rowData, ind) => (
                <td
                  key={ind}
                  className="border-2 border-gray-200 px-3 py-1"
                >
                  {ind === dataRow.length - 1 && href ? (
                    <Link
                      href={`${href}/${dataRow[0]}`}
                      className="text-blue-600 hover:underline"
                    >
                      {rowData}
                    </Link>
                  ) : (
                    rowData
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
