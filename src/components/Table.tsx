"use client"
import React from 'react'

const Table = () => {
  return (
    <div>
      <table className="table-auto">
        <tr>
          <th scope="col" className='border-2 border-gray-200 px-3 py-1'>Company</th>
          <th scope="col" className='border-2 border-gray-200 px-3 py-1'>Contact</th>
          <th scope="col" className='border-2 border-gray-200 px-3 py-1'>Country</th>
        </tr>
        <tr>
          <td scope='row' className='border-2 border-gray-200 px-3 py-1'>Alfreds Futterkiste</td>
          <td className='border-2 border-gray-200 px-3 py-1'>Maria Anders</td>
          <td className='border-2 border-gray-200 px-3 py-1'>Germany</td>
        </tr>
      </table>
    </div>
  )
}

export default Table
