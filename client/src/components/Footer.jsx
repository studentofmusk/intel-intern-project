import React from 'react'

const Footer = ({className}) => {
  return (
    <section className={`${className} h-14 bg-my-text flex justify-center items-center`}>
        <p className='text-my-secondary text-xs sm:text-xl '>Do Docs - copyrights <span className='inter'>&copy;</span> 2024-2025</p>
    </section>
  )
}

export default Footer