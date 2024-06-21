import React from 'react'
import robot from "../../images/robot.png"

const Right = ({className=""}) => {
  return (
    <div 
    className={`${className} p-12`}  >
        <img src={robot} className='w-[440px] mb-10' alt="" />
        <div className='space-y-4 mt-20'>
          <h3 className="text-2xl text-my-text">Create Your Own Document</h3>
          <p className="ml-3 text-my-text w-[450px]">some thist to sd kjkds dfj asdfjadsfnvlkjsd dfjf e sdf erg sdf ge safd.df aw fawe fdsfew as dfawetasdfsad</p>
          <button className='ml-3 py-3 px-7 rounded-md inter bg-my-text text-sm text-white '>QUICK START</button>
        </div>
          
    </div>
  )
}

export default Right