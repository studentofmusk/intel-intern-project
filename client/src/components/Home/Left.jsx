import React from 'react'
import Upload from './Upload'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Left = ({className}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    return (
    <div className={`${className} space-y-10` } >
        <h2 className='text-my-text text-3xl'>
            <span className='text-my-red'>Quick</span> Process Documents
        </h2>

        <div className='ml-3 space-y-5'>
            <label 
                htmlFor="file" 
                className='mr-10 text-xl text-my-text'>Test Files</label>
            <select name="file" id="file" className='inter text-xs bg-my-text text-my-secondary p-1 px-2 rounded'>
                <option value="" >Select</option>
                <option value="file1">File 1</option>
            </select>
            <p className='text-my-text text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis maiores reiciendis minima sint ipsam quibusdam, voluptatum aperiam nostrum.</p>
        </div>

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
        <center className='w-3/4'>
            <Link to="/progress">
                <button className='inter py-2 px-4 rounded-md text-sm bg-my-primary text-my-secondary'>PROCEED</button>
            </Link> 
        </center>


    </div>
  )
}

export default Left