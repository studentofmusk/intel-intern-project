import React from 'react'
import Left from "../components/Home/Left";
import Right from "../components/Home/Right";

const Home = ({className=""}) => {
  return (
    <section className={`${className} mx-auto mt-20 flex justify-between space-x-14`} >
        <Left className="w-5/12" />
        <Right className="w-5/12 mt-5 " />
    </section>
  )
}

export default Home