import React from 'react'
import brand from "../images/brand.png"
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='h-28 flex justify-end items-center'>
        <Link to="/" className="h-4/6 mr-10" >
          <img src={brand} className='h-full' alt="logo"  />
        </Link>
    </div>
  )
}

export default Header