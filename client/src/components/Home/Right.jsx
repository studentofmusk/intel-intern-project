import React from 'react'
import hero from "../../images/hero-1.png"
import slopeRectangle from "../../images/Slope-Rectangle.png"
import { Link } from 'react-router-dom'



const Right = ({className}) => {

  return (
    <div 
    style={{backgroundImage:`url(${slopeRectangle})`}} 
    className={`${className} p-2 sm:p-12 bg-cover space-y-4 sm:space-y-5`}  >

          <h3 className="text-xl sm:text-2xl text-my-text">Create Your Own Document</h3>
          <p className="text-xs sm:text-base ml-3 text-my-text sm:w-[450px]">Here you can create your Business Contract with pre-defined template </p>
          <Link to="/create" className='block'>
            <button className='ml-3 py-2 sm:py-3 px-4 sm:px-7 rounded-md inter bg-my-text text-xs sm:text-sm text-white '>QUICK START</button>
          </Link>
          <img src={hero} className='w-4/5 sm:w-full' alt="" />
    </div>
  )
}
 
export default Right