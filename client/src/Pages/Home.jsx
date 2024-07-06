import React from 'react'
import Left from "../components/Home/Left";
import Right from "../components/Home/Right";

const Home = ({className="", selectedFile, setSelectedFile=()=>{}, OnClickProceed=()=>{}, Test, setTest=()=>{}}) => {
  return (
    <section className={`${className} mx-auto mt-20 flex sm:flex-row flex-col justify-between sm:space-x-14`} >
        <Left selectedFile={selectedFile} 
            setSelectedFile={setSelectedFile} 
            OnClickProceed={OnClickProceed} 
            Test={Test} 
            setTest={setTest} 
            className="sm:w-5/12" />

        <Right className="sm:w-5/12 mt-10 sm:mt-5 " />
    </section>
  )
}

export default Home