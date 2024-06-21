import React from 'react'

const Upload = ({className, selectedFile, setSelectedFile}) => {
    
    
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleDrop = (e)=>{
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0){
            setSelectedFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();        
        }
    }

    const handleDragOver = (e)=>{
        e.preventDefault();
    }

  return (
    <>
        <label 
            onDragOver={handleDragOver} 
            onDrop={handleDrop} 
            className={`${className} block rounded-lg ${selectedFile? "bg-white" :"bg-my-text2"} opacity-80`} 
            htmlFor="uploadFile">
                <input 
                    type="file"  
                    id='uploadFile' 
                    className='hidden' 
                    onChange={handleFileChange}/>
                {
                selectedFile?(
                        <div className='ml-3 mt-4'>
                            <div className='text-my-primary text-lg' >
                                Selected File
                            </div>
                            <div className='text-my-text2 text-xl'>
                                {selectedFile.name}
                            </div>

                        </div>

                    ):(

                        <div className='text-[18px] w-full h-full flex flex-col justify-center items-center text-my-secondary'>
                            <div>Drop your Document</div>
                            <div>Here !</div>

                        </div>
                    )
                }
        </label>
    </>
  )
}

export default Upload