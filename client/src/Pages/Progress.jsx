import React, { useEffect, useState } from 'react'
import Left from '../components/Processing/Left'
import Right from '../components/Processing/Right'
import { useNavigate } from 'react-router-dom'


const Progress = ({className, setDoc}) => {
  const [state, setState] = useState("")
  const navigator = useNavigate();
  
  const fetchResponse = async(file_name)=>{

    const res = await fetch("/process_pdf", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        },
        body:JSON.stringify({
          filename:file_name,
        }),
      })

      const response = await res.json()

        if (response.success){
          setDoc(response.data)
        }
        else{
          console.log(response.message)
          window.alert(response.message);
        }
      }
  
  const getResponse = async()=>{
    try {
      setState("Uploading...")
      // Get the current URL
      let currentUrl = window.location.search;
      // Create a URLSearchParams object from the current URL
      const searchParams = new URLSearchParams(currentUrl);
      // Get the value of the 'file' parameter
      const file_name = searchParams.get('file');
      
      
      if (!file_name) return
      setState("Processing...")
      await fetchResponse(file_name)
      setState("Done !")
      setTimeout(()=>{
        navigator("/view")
        setState("")
      }, 3000)
    } catch (error) {
      console.log(error.message);
    
    }
  }

  useEffect(()=>{
    getResponse()
  }, [])
  return (
    <div className={`${className} mx-auto mt-20 flex justify-between`}>
      <Left className='w-5/12' state={state}/>
      <Right className='w-4/12 mt-10'/>
    </div>
  )
}

export default Progress