import React from 'react'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

const StatCard = ({ title, value, icon, change, changeType }) => {
  const isPositive = changeType === 'up'

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between hover:shadow-lg transition">
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
          {change}
        </div>
      </div>
      <div className="text-3xl text-purple-600">
        {icon}
      </div>
    </div>
  )
}

export default StatCard