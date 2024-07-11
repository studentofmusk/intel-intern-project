import React, { useEffect, useState } from 'react'
import Left from '../components/Processing/Left'
import Right from '../components/Processing/Right'
import { useNavigate } from 'react-router-dom'



const Progress = ({className, setDoc, selectedFile}) => {
  const [state, setState] = useState("")
  const navigator = useNavigate();
  const [isRedirected, setRedirected] = useState(false);
  
  const fetchResponse = async(file_name)=>{
    let res;
    
    if (file_name === "process"){
      let formData = new FormData();
      formData.append("file", selectedFile);
      // console.log(formData);
      res = await fetch("/api/process_pdf", {
        method:"POST",
        body:formData
      })
    }
    else{
      res = await fetch(`/api/process_pdf?filename=${file_name}`)
    }
    
      const response = await res.json()

        if (response.success){
          setTimeout(()=>{
            setState("Done !")
            setDoc(response.data)

          }, 2000)
          setTimeout(()=>{
            if(!isRedirected){
              console.log(isRedirected)
              navigator("/view");
            }
            setState("")
          },3000)
        }
        else{
          window.alert(response.message);
          navigator("/");
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
    } catch (error) {
      console.log(error.message);
    
    }
  }

  useEffect(()=>{
    getResponse()
  }, [])


  return (
    <div className={`${className} mx-auto mt-20 flex sm:flex-row flex-col justify-between`}>
      <Left className='sm:w-5/12' state={state}/>
      <Right setRedirected={setRedirected} className='sm:w-4/12 sm:mt-10'/>
    </div>
  )
}

export default Progress