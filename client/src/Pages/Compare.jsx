import React, {useEffect, useState} from 'react'
import Upload from '../components/Home/Upload';

const Compare = ({className=""}) => {
    const [files, setFiles] = useState([]);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [isProcessed, setProcessed] = useState(false);
    const [data, setData] = useState([[], []])
    const [entities, setEntities] = useState([[],[]]);
    const [details, setDetails] = useState([{},{}])
    let uniqueList = [];
    
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


      const handleSubmit = async(e)=>{
        e.preventDefault();
        e.target.disabled = true;
        let formData = new FormData();
        formData.append("file1", selectedFile1);
        formData.append("file2", selectedFile2);

        try{
          const res = await fetch("/api/compare", {
            method:"POST",
            body:formData
          });

          const response = await res.json();

          if (response.success){
            setProcessed(true);
            setData(response.data);
            console.log(response.data);
          }

        }catch(e){
          window.alert("Something went wrong!")
          console.log(e.message)
        }finally{
          e.target.disabled = false;
        }
      }

      useEffect(()=>{
        let all_entities = [[], []];
        data.map((doc, idx) => {
          doc.map((element) => {
            if (element["predicted_class"] !== 6) {
                for (let entity of element.entities){
                  all_entities[idx].push(entity)
                }
            }
          });
        });
        setEntities(all_entities)
      }, data)

      useEffect(()=>{
        let temp_details = [{}, {}]
        entities.map((doc, idx)=>{
          doc.map((entity)=>{
          if (!temp_details[idx][entity[1]]){
            temp_details[idx][entity[1]] = entity[0];
          }
          })
        })
        setDetails(temp_details);
      }, [entities])
  return (
    <div className={`${className} mx-auto`}>
        <section className={`mt-10 ${isProcessed?"":"w-3/5"} sm:mt-20 min-h-[80vh]`}>

            {!isProcessed
            ?<h2 className='text-my-text text-2xl sm:text-3xl'>
              <span className='text-my-red'>Compare</span> Documents
            </h2>
            :<h2 className='text-my-text text-2xl sm:text-3xl'>
            <span className='text-my-red'>Result</span> Summary
          </h2>
              
            }
            {!isProcessed
            ?<>
            
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

            <button className='mt-7 ml-3 bg-my-red text-white p-1 rounded-lg' onClick={handleSubmit}>Compare</button>
            </>
            :<div className='flex justify-between mt-5'>
              {details.map((DOC, idx)=>{
                return (<div key={idx} className=' w-[45%] text-sm sm:text-base overflow-y-scroll no-scrollbar'>
                  <h3 className='text-xl text-my-primary '>Document {idx+1}</h3>
                <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Parties Involved:</div>
                <ul className='ml-3 space-y-1 text-xs sm:text-base'>
                  <li>
                    <span className='mr-2 text-my-primary'>Party A:</span>
                    <span>{DOC.PARTY_A?DOC.PARTY_A:"PARTY A"}</span>
                  </li>
                  <li>
                    <span className='mr-2 text-my-primary'>Party B:</span>
                    <span>{DOC.PARTY_B?DOC.PARTY_B:"PARTY B"}</span>
                  </li>
                </ul>
    
                <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Services Provided:</div>
    
                <ul className='ml-3 space-y-1 text-xs sm:text-base'>
                  <li>
                    {`${DOC.PARTY_A} agrees to provide the following services to ${DOC.PARTY_B}: service1, service2, service3.`}
                  </li>
                </ul>
    
                <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Payment:</div>
                <ul className='ml-3 space-y-1 text-xs sm:text-base'>
                  <li>
                  {`${DOC.PARTY_B?DOC.PARTY_B:"PARTY B"} agrees to pay ${DOC.PARTY_A?DOC.PARTY_A:"PARTY A"} $${DOC.MONEY?DOC.MONEY:"000"} for the services.
                    Payment shall be made within ${DOC.NOTICE_DAYS} days of receiving an invoice.`}
                  </li>
                </ul>
    
                <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Contract Term:</div>
                <ul className='ml-3 space-y-1 text-xs sm:text-base'>
                  <li>
                    <span className='mr-2 text-my-primary'>Start Date:</span>
                    <span>{DOC.START_DATE?DOC.START_DATE:"START DATE"}</span>
                  </li>
                  <li>
                    <span className='mr-2 text-my-primary'>End Date:</span>
                    <span>{DOC.END_DATE?DOC.END_DATE:"END DATE"}</span>
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
                    {`Either party may terminate the contract with ${DOC.NOTICE_DAYS?DOC.NOTICE_DAYS:"0"} days written notice.
                    ${DOC.PARTY_A?DOC.PARTY_A:"PARTY A"} will be compensated for all services performed up to the termination date.`}
                  </li>
                </ul>
    
                <div className='mt-3 mb-1 sm:text-lg font-semibold text-my-violet capitalize tracking-wide'>Governing Law:</div>
                <ul className='ml-3 space-y-1 text-xs sm:text-base'>
                  <li>
                    {`The contract is governed by the laws of the State of ${DOC.STATE?DOC.STATE:"NULL"}.`}
                  </li>
                </ul>
    
    
    
                  </div>)
                })}
            </div>
            }
        </section>
    </div>

  )
}

export default Compare