import React from 'react'

const Left = ({className="", doc=[]}) => {
  const styles = {
    0:"my-primary",
    1:"my-red",
    2:"my-violet",
    3:"my-text",
    4:"yellow-700",
    5:"my-brown"
  }
  const classes = {
    0: "Services Provided", 
    1: "Payment", 
    2: "Term", 
    3: "Confidentiality", 
    4: "Termination", 
    5: "Governing Law", 
    6: "Signatures"
  }
  
  function getStyle(class_number){
    if (class_number === 6) return ""
    return styles[class_number]
  }

  function highlightText(p="", entities, class_number){
      for (let entity of entities){
          if (p.includes(entity[0])){
            p = p.replace(entity[0], ` <span 
              class="
              text-my-text 
              px-1 
              rounded-lg
              bg-pale-pink 
              relative group">
              
              ${entity[0]}
              </span> `)
          }
      }
    return p
  }

  return (
    <div className={`${className} `}>
      
      <center className='text-xl sm:text-2xl text-black' >Highlighted Documents</center>


      <div
        className={`
          hover:border-my-violet
          hover:border-my-red
          hover:border-my-text
          hover:border-yellow-700
          hover:border-my-primary
          hover:border-my-brown
          group-hover:text-yellow-700
          group-hover:text-my-red
          group-hover:text-my-violet
          group-hover:text-my-primary
          group-hover:text-my-text
          group-hover:text-my-brown
          bg-my-red
          bg-my-violet
          bg-my-brown
          bg-yellow-700
          bg-my-text
          
          `}
        >

      </div>

      <div className='mt-5 flex flex-col justify-ar sm:h-[80vh] overflow-y-scroll no-scrollbar box-border space-y-3'>
        {doc.map((element, idx)=>{
          let p = highlightText(element.line, element.entities, element.predicted_class)
          return <div key={idx}>

                    <p className={`
                      relative
                      group 
                      text-xs sm:text-xl 
                      sm:mt-2 p-1 sm:p-3 
                      border sm:border-2
                      border-white
                      rounded-sm sm:rounded-lg
                      duration-150
                      hover:-translate-y-0.5 
                      hover:border-${getStyle(element.predicted_class)} 
                      `}
                      >
                        
                        <span 
                        dangerouslySetInnerHTML={{__html:p}}
                        ></span>
                        <span className={`
                            uppercase
                            font-bold tracking-wider 
                            text-xs sm:text-sm
                            ml-10
                            translate-y-2
                            group-hover:text-${getStyle(element.predicted_class)}
                          text-white`}>
                              {classes[element.predicted_class]}
                          </span> 
                      </p>
                    
                </div>
        })}
        
      </div>
    </div>
  )
}

export default Left