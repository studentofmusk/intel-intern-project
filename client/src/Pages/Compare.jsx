import React, {useEffect, useState} from 'react'
import Upload from '../components/Home/Upload';

const Compare = ({className=""}) => {
    const [files, setFiles] = useState([]);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    
    // Fetch Test File names
    useEffect(() => {
        const fetchFiles = async () => {
          try {
            const res = await fetch("/api/get-files");
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
  return (
    <div className={`${className} mx-auto`}>
        <section className='w-3/6'>

            <h2 className='text-my-text text-2xl sm:text-3xl'>
                <span className='text-my-red'>Compare</span> Documents
            </h2>
            
            <div>
                <div className='ml-3 mt-10 mb-1 text-my-text'>
                <div className='text-lg sm:text-xl'>Select File: 1 </div>
                <p className='text-[13px] mt-5' > For upload <label className='text-my-primary' htmlFor="uploadFile1">click here</label></p>
                </div>
                <Upload 
                selectedFile={selectedFile1} 
                setSelectedFile={setSelectedFile1} 
                className={selectedFile1?"h-10 sm:w-3/4 duration-200" :"h-48 sm:w-3/4"}
                id='uploadFile1'
                />
            </div>
            <div>
                <div className='ml-3 mt-10 mb-1 text-my-text'>
                <div className='text-lg sm:text-xl'>Select File: 2 </div>
                <p className='text-[13px] mt-5' > For upload <label className='text-my-primary' htmlFor="uploadFile2">click here</label></p>
                </div>
                <Upload 
                selectedFile={selectedFile2} 
                setSelectedFile={setSelectedFile2} 
                className={selectedFile2?"h-10 sm:w-3/4 duration-200" :"h-48 sm:w-3/4"}
                id="uploadFile2"
                />
            </div>
            {/* <button>Compare</button> */}
        </section>
    </div>

  )
}

export default Compare