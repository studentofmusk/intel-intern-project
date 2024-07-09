import React from 'react'
import robot from "../../images/robot.png"
import { Link, useNavigate } from 'react-router-dom'

const Right = ({className="", setRedirected}) => {
  const navigator = useNavigate();
  const handleClick = ()=>{
    setRedirected(true);
    navigator("/create")
  }
  return (
    <div 
    className={`${className} p-3 sm:p-12`}  >
        <img src={robot} className='hidden sm:block sm:w-[440px] mb-10' alt="" />
        <div className='space-y-4 sm:mt-20'>
          <h3 className="text-xl sm:text-2xl text-my-text">Create Your Own Document</h3>
          <p className="text-xs sm:text-base ml-3 text-my-text sm:w-[400px]">Customize your contract by specifying the details and clauses that best fit your needs.</p>
          <button onClick={handleClick} className='ml-3 py-2 sm:py-3 px-4 sm:px-7 rounded-md inter bg-my-text text-xs sm:text-sm text-white'>QUICK START</button>
        </div>
          
    </div>
  )
}

export default Right