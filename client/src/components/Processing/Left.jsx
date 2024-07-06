import React from 'react'
import car from "../../videos/car.mp4"

const Left = ({state="", className=""}) => {
  return (
    <div className={` ${className}`}>
        <div className='w-full sm:space-y-4'>
            <div className='text-xl sm:text-3xl text-my-text '>Learning Patterns</div>
            <div>{state}</div>
            <div className='h-3 sm:h-4 w-full border border-my-text box-border'>
                <div className={`duration-1000 w-[${state==="Uploading..."?"10%":(state==="Processing..."?"20%":(state==="Done !"?"100%":"0%"))}] h-full bg-my-text`}></div>
            </div>
        </div>
        <div className="mt-4 sm:mt-10 relative w-full h-[350px] overflow-hidden" >
            <video 
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2" 
                autoPlay 
                loop 
                muted>
                    <source src={car} type="video/mp4" />
                    Your browser does not support the video tag.
            </video>
        </div>

    </div>
  )
}

export default Left