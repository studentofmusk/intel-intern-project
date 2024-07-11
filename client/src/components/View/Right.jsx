import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Right = ({ className = "", entities = [] }) => {
  const [isSummary, setSummary] = useState(false);
  let uniqueList = [];
  const [details, setDetails] = useState({})

  useEffect(()=>{
      let temp = {}
      entities.map((element, idx) => {
        if(!temp[element[1]])
          temp[element[1]] = element[0];
      })
      setDetails(temp)
      // console.log(details)
    }, [entities])
  return (
    <div
      className={`${className} p-3 sm:p-12`}  >

      <div className='w-10/12 '>
        <div className='flex items-end'>
          <div onClick={() => setSummary(false)} className={`${isSummary ? "opacity-45 hover:scale-[101%] hover:opacity-60" : "opacity-100"} text-xl sm:text-2xl cursor-pointer duration-100 mr-5 mb-5 text-black`}>Main Entities</div>
          <div onClick={() => setSummary(true)} className={`${isSummary ? "opacity-100" : "opacity-45 hover:scale-[101%] hover:opacity-60"} text-xl sm:text-2xl cursor-pointer duration-100 mr-5 mb-5  text-black`}>Summary</div>
        </div>

        {isSummary

          ? <div className='sm:h-80 w-full text-sm sm:text-base overflow-y-scroll no-scrollbar'>
            <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Parties Involved:</div>
            <ul className='ml-3 space-y-1 text-xs sm:text-base'>
              <li>
                <span className='mr-2 text-my-primary'>Party A:</span>
                <span>{details.PARTY_A?details.PARTY_A:"PARTY A"}</span>
              </li>
              <li>
                <span className='mr-2 text-my-primary'>Party B:</span>
                <span>{details.PARTY_B?details.PARTY_B:"PARTY B"}</span>
              </li>
            </ul>

            <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Services Provided:</div>

            <ul className='ml-3 space-y-1 text-xs sm:text-base'>
              <li>
                {`${details.PARTY_A} agrees to provide the following services to ${details.PARTY_B}: service1, service2, service3.`}
              </li>
            </ul>

            <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Payment:</div>
            <ul className='ml-3 space-y-1 text-xs sm:text-base'>
              <li>
              {`${details.PARTY_B?details.PARTY_B:"PARTY B"} agrees to pay ${details.PARTY_A?details.PARTY_A:"PARTY A"} $${details.MONEY?details.MONEY:"000"} for the services.
                Payment shall be made within ${details.NOTICE_DAYS} days of receiving an invoice.`}
              </li>
            </ul>

            <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Contract Term:</div>
            <ul className='ml-3 space-y-1 text-xs sm:text-base'>
              <li>
                <span className='mr-2 text-my-primary'>Start Date:</span>
                <span>{details.START_DATE?details.START_DATE:"START DATE"}</span>
              </li>
              <li>
                <span className='mr-2 text-my-primary'>End Date:</span>
                <span>{details.END_DATE?details.END_DATE:"END DATE"}</span>
              </li>
            </ul>

            <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Confidentiality:</div>
            <ul className='ml-3 space-y-1 text-xs sm:text-base'>
              <li>
                Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the term of this contract. This obligation continues beyond the termination of the contract.
              </li>
            </ul>

            <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Termination:</div>
            <ul className='ml-3 space-y-1 text-xs sm:text-base'>
              <li>
                {`Either party may terminate the contract with ${details.NOTICE_DAYS?details.NOTICE_DAYS:"0"} days written notice.
                ${details.PARTY_A?details.PARTY_A:"PARTY A"} will be compensated for all services performed up to the termination date.`}
              </li>
            </ul>

            <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Governing Law:</div>
            <ul className='ml-3 space-y-1 text-xs sm:text-base'>
              <li>
                {`The contract is governed by the laws of the State of ${details.STATE?details.STATE:"NULL"}.`}
              </li>
            </ul>



          </div>

          : <div className='h-80 w-full text-sm sm:text-base overflow-y-scroll no-scrollbar' >
            {
              entities.map((element, idx) => {
                if (uniqueList.includes(element[0])) {
                  return <></>
                }
                
                uniqueList.push(element[0]);
                return (
                  <div key={idx} className='cursor-default w-full flex justify-between'>
                    <div className='py-2' >{element[0]}</div>
                    <div className='py-2 text-end text-my-violet uppercase'>{element[1]}</div>
                  </div>
                )
              })
            }
          </div>
        }

      </div>
      <div className='space-y-4 mt-20 '>
        <h3 className="text-xl sm:text-2xl text-my-text">Create Your Own Document</h3>
        <p className="text-xs sm:text-base ml-3 text-my-text sm:w-[400px]">Customize your contract by specifying the details and clauses that best fit your needs.</p>
        <Link to="/create" className=' block'>
          <button className='ml-3 py-2 sm:py-3 px-4 sm:px-7 rounded-md inter bg-my-text text-xs sm:text-sm text-white '>QUICK START</button>
        </Link>
      </div>

    </div>
  )
}

export default Right