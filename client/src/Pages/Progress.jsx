import React from 'react'
import Left from '../components/Processing/Left'
import Right from '../components/Processing/Right'
import { useNavigate } from 'react-router-dom'

const Progress = ({className}) => {
  const navigator = useNavigate();
  setTimeout(()=>navigator("/view"), 3000)
  return (
    <div className={`${className} mx-auto mt-20 flex justify-between`}>
      <Left className='w-5/12'/>
      <Right className='w-4/12 mt-10'/>
    </div>
  )
}

export default Progress