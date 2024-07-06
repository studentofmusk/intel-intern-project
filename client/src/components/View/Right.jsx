import React from 'react'
import { Link } from 'react-router-dom'

const Right = ({className="", entities=[]}) => {
    let uniqueList = [];
      return (
    <div 
    className={`${className} p-3 sm:p-12`}  >
        
        <div className='w-10/12 '>
            <div className='text-center mb-5 text-2xl text-black'>Main Entities</div>
                
                <div className='h-80 w-full text-sm sm:text-base overflow-y-scroll no-scrollbar' >
                    {
                    entities.map((element, idx) => {
                        if (uniqueList.includes(element[0])){
                            return <></>
                        } 
                        uniqueList.push(element[0]);
                        return (
                            <div key={idx} className='hover:-translate-y-0.5 duration-150 cursor-default w-full flex justify-between'>
                                <div className='py-2' >{element[0]}</div>
                                <div className='py-2 text-end text-my-violet uppercase'>{element[1]}</div>
                            </div>
                            )
                        })
                    }
                </div>
                    
        </div>
        <div className='space-y-4 mt-20'>
          <h3 className="text-xl sm:text-2xl text-my-text">Create Your Own Document</h3>
          <p className="text-xs sm:text-base ml-3 text-my-text sm:w-[450px]">some thist to sd kjkds dfj asdfjadsfnvlkjsd dfjf e sdf erg sdf ge safd.df aw fawe fdsfew as dfawetasdfsad</p>
          <Link to="/create" className=' block'>
            <button className='ml-3 py-2 sm:py-3 px-4 sm:px-7 rounded-md inter bg-my-text text-xs sm:text-sm text-white '>QUICK START</button>
          </Link>
        </div>
          
    </div>
  )
}

export default Right