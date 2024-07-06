import React, { useState } from 'react'
import Left from '../components/Create/Left';
import Right from '../components/Create/Right';

const Create = ({className=""}) => {
    const [generate, setGenerate] = useState("custom");
    const [genStatus, setGenStatus] = useState(false);
    const [filename, setFilename] = useState("demo")

    const [details, setDetails] = useState({
        service_provider_name:"",
        client_name:"",
        amount:0,
        start_date:"",
        end_date:"",
        state:"",
        notice_days:0
    });


    const handleGenerate = async(e)=>{

      try {
        setGenStatus(true);
        let response;
        if (generate === "auto") {

          response = await fetch(`/api/generate-doc?filename=${filename}.pdf`);
          
        }else{
          response = await fetch(`/api/generate-doc`, {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              ...details, filename
            })
          });

        }
        
        if (response.status !== 201) {
          throw new Error("Failed to fetch the file.");
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.pdf`; 
        document.body.appendChild(a);
        a.click(); 
        a.remove();
        window.URL.revokeObjectURL(url); 
        
       } catch (error) {
        window.alert("Unable To Generate!");
        console.log(error.message);
      }finally{
        setGenStatus(false);
      } 
    }

  return (
    <div className={`${className} mx-auto mt-20 flex sm:flex-row flex-col justify-between`}>
            <Left 
                generate={generate} 
                setGenerate={setGenerate} 
                details={details} 
                setDetails={setDetails}
                genStatus={genStatus}
                handleGenerate={handleGenerate}
                filename={filename}
                setFilename={setFilename}
                />
            
            <Right className=' sm:w-4/12'/>
    </div>
  )
}

export default Create