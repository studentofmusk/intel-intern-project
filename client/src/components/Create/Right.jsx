import React from 'react'
import robot from "../../images/boy.jpg"
import { Link } from 'react-router-dom'

const Right = ({className=""}) => {
  return (
    <div 
    className={`${className} p-2 sm:p-12`}  >
        <img src={robot} className='sm:w-[440px] mb-10' alt="" />
        <div className='space-y-4 mt-20'>
          <h3 className="text-xl sm:text-2xl text-my-text">Quick Analysis Document</h3>
          <p className="text-xs sm:text-base ml-3 text-my-text sm:w-[450px]">By uploading your Business Contract PDF, you can get the highlighted quick view!</p>
          <Link to="/" className='block'>
            <button className='ml-3 py-2 sm:py-3 px-4 sm:px-7 rounded-md inter bg-my-text text-xs sm:text-sm text-white '>QUICK START</button>
          </Link>
        </div>
          
    </div>
  )
}

export default Right