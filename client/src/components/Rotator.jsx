import React from 'react'
import rotator from "../images/Rotator.png"

const Rotator = ({className="", pathname="/"}) => {
  
  return (
    <img 
      src={rotator} 
      className={`${className} 
      absolute 
      -translate-x-2/4 -translate-y-2/4 
      duration-200 
      ${ pathname === "progress"?"rotate-90":(
          pathname=== "view"?"rotate-180":(
            pathname==="create"?"-rotate-90":"rotate-0"
          )
      ) }`} alt="" />
  )
}

export default Rotator