"use client"
import React from 'react'

const Table = ({ headings, dataRows }: { headings: string[], dataRows: (string | number)[][] }) => {
  console.log('headings:', headings);
  console.log('dataRows:', dataRows);
  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            {headings.map((heading, index) => {
              return <th key={index} scope="col" className='border-2 border-gray-200 px-3 py-1'>{heading}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((dataRow, index) => {
            return <tr key={index}>
              {dataRow.map((rowData, ind) => {
                return <td key={ind} scope='row' className='border-2 border-gray-200 px-3 py-1'>{rowData}</td>
              })}
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
