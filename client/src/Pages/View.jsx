import React, { useEffect, useState } from 'react'
import Right from '../components/View/Right'
import Left from '../components/View/Left'

const View = ({className="", doc=[]}) => {
  const [entities, setEntities] = useState([])
  
    
    useEffect(()=>{
        // console.log(doc)
        let Entities = []
        doc.forEach((element)=>{
          Entities=Entities.concat(element.entities)
        })

        setEntities(Entities)
    }, [doc])
  return (
    <div className={`${className} flex justify-between mx-auto`}>
        <Left className='w-7/12' doc={doc}/>
        <Right className='w-4/12 mt-20' entities={entities} />
    </div>
  )
}

export default View