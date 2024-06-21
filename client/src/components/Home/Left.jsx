import React, { useEffect } from 'react'
import Upload from './Upload'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Left = ({className}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [Test, setTest] = useState("");
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    // Handle Proceed
    const OnClickProceed = (e)=>{
      if (Test){
          navigate(`/progress?file=${Test}`)
      }
    }
    
    // Fetch Test File names
    useEffect(() => {
        const fetchFiles = async () => {
          try {
            const res = await fetch("/get-files");
            // Check if the response is not OK (e.g., 404, 500)
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const response = await res.json();
    
            if (response.success) {
              setFiles(response.data);
            } else {
              alert(response.message);
            }
          } catch (err) {
            console.error("Error fetching files:", err.message);
          }
        };
    
        fetchFiles();
      }, []);
    
    // Handle Test Select actions
    useEffect(()=>{
      if(!Test) document.getElementById("file").value = "";
    }, [Test])

    
    return (
    <div className={`${className} space-y-10` } >
        <h2 className='text-my-text text-3xl'>
            <span className='text-my-red'>Quick</span> Process Documents
        </h2>

        <div className='ml-3 space-y-5'>
            <label 
                htmlFor="file" 
                className='mr-10 text-xl text-my-text'>Test Files</label>
            <select name="file" id="file" onChange={(e)=>setTest(e.target.value)} className='inter text-xs bg-my-text text-my-secondary p-1 px-2 rounded'>
                <option value="" >Select</option>
                {files.map((element="", idx)=>(<option key={idx} value={element}>{element.split(".")[0]}</option>))}
            </select>
            {Test
              ?<>
                  <label htmlFor="cancel" className='block text-my-text' >Click here to cancel the test case</label>
                  <button id='cancel' className=' bg-my-red text-white rounded-lg px-2 p-1 ml-2 mt-5' onClick={(e)=>{setTest("")}}>Cancel</button>
              </>  
              :<p className='text-my-text text'>Choose any test files from above the perform demo Document Analysis!</p>
            }
        </div>
      {Test?"":

        <div>
            <div className='ml-3 mt-10 mb-1 text-my-text'>
                <div className='text-xl'>Upload</div>
                <p className='text-[13px] mt-5' > For upload <label className='text-my-primary' htmlFor="uploadFile">click here</label></p>
            </div>
            <Upload 
                selectedFile={selectedFile} 
                setSelectedFile={setSelectedFile} 
                className={selectedFile?"h-10 w-3/4 duration-200" :"h-48 w-3/4"}
                />
        </div>
      }
        <center className='w-3/4'>
                <button onClick={OnClickProceed} className='inter py-2 px-4 rounded-md text-sm bg-my-primary text-my-secondary'>PROCEED</button>
           
        </center>


    </div>
  )
}

export default Left