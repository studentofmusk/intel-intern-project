import React from 'react'
import hero from "../../images/hero-1.png"
import slopeRectangle from "../../images/Slope-Rectangle.png"



const Right = ({className}) => {
  return (
    <div 
    style={{backgroundImage:`url(${slopeRectangle})`}} 
    className={`${className} p-12 bg-cover space-y-5`}  >

          <h3 className="text-2xl text-my-text">Create Your Own Document</h3>
          <p className="ml-3 text-my-text w-[450px]">some thist to sd kjkds dfj asdfjadsfnvlkjsd dfjf e sdf erg sdf ge safd.df aw fawe fdsfew as dfawetasdfsad</p>
          <button className='ml-3 py-3 px-7 rounded-md inter bg-my-text text-sm text-white '>QUICK START</button>
          <img src={hero} alt="" />
          
    </div>
  )
}
 
export default Right