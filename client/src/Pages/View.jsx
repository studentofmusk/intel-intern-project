import React, { useEffect, useState } from 'react'
import Right from '../components/View/Right'
import Left from '../components/View/Left'

const View = ({className=""}) => {
    const [entities, setEntities] = useState([["Yoko Haks", "ORG"], ["Sara", "NAME"], ["200", "CURRENCY"], ["76 days", "DAY"], ["12 July 2024", "DATE"]])
    
    const [doc, setDoc] = useState([
      {
        "entities": [],
        "line": "Business Contract",
        "predicted_class": 6
      },
      {
        "entities": [
          [
            "1",
            "CARDINAL"
          ]
        ],
        "line": "1. Services Provided:",
        "predicted_class": 0
      },
      {
        "entities": [
          [
            "Spencer PLC",
            "ORG"
          ],
          [
            "Cruz Ltd.",
            "ORG"
          ],
          [
            "service1",
            "ORG"
          ],
          [
            "service2",
            "ORG"
          ],
          [
            "service3",
            "PRODUCT"
          ]
        ],
        "line": "Spencer PLC agrees to provide the following services to Cruz Ltd. services are service1, service2, service3.",
        "predicted_class": 0
      },
      {
        "entities": [
          [
            "2",
            "CARDINAL"
          ]
        ],
        "line": "2. Payment:",
        "predicted_class": 6
      },
      {
        "entities": [
          [
            "Cruz Ltd",
            "ORG"
          ],
          [
            "Spencer PLC",
            "ORG"
          ],
          [
            "84005",
            "MONEY"
          ]
        ],
        "line": "Cruz Ltd agrees to pay Spencer PLC the amount of $84005 for the services described above. Payment shall be made",
        "predicted_class": 1
      },
      {
        "entities": [
          [
            "32 days",
            "DATE"
          ],
          [
            "Spencer PLC",
            "ORG"
          ]
        ],
        "line": "within 32 days of receiving an invoice from Spencer PLC.",
        "predicted_class": 1
      },
      {
        "entities": [
          [
            "3",
            "CARDINAL"
          ]
        ],
        "line": "3. Term:",
        "predicted_class": 6
      },
      {
        "entities": [
          [
            "2024-03-04",
            "DATE"
          ],
          [
            "2024-02-18",
            "DATE"
          ]
        ],
        "line": "This contract will commence on 2024-03-04 and will continue until 2024-02-18 unless terminated earlier in",
        "predicted_class": 2
      },
      {
        "entities": [],
        "line": "accordance with the Termination clause.",
        "predicted_class": 5
      },
      {
        "entities": [
          [
            "4",
            "CARDINAL"
          ]
        ],
        "line": "4. Confidentiality:",
        "predicted_class": 3
      },
      {
        "entities": [],
        "line": "Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the",
        "predicted_class": 3
      },
      {
        "entities": [],
        "line": "term of this contract. This obligation will continue beyond the termination of this contract.",
        "predicted_class": 3
      },
      {
        "entities": [
          [
            "5",
            "CARDINAL"
          ]
        ],
        "line": "5. Termination:",
        "predicted_class": 6
      },
      {
        "entities": [
          [
            "32 days",
            "DATE"
          ]
        ],
        "line": "Either party may terminate this contract with 32 days written notice to the other party. In the event of termination,",
        "predicted_class": 4
      },
      {
        "entities": [
          [
            "Spencer PLC",
            "ORG"
          ]
        ],
        "line": "Spencer PLC will be compensated for all services performed up to the date of termination.",
        "predicted_class": 4
      },
      {
        "entities": [
          [
            "6",
            "CARDINAL"
          ]
        ],
        "line": "6. Governing Law:",
        "predicted_class": 6
      },
      {
        "entities": [
          [
            "Oregon",
            "GPE"
          ]
        ],
        "line": "This contract shall be governed by and construed in accordance with the laws of the State of Oregon.",
        "predicted_class": 5
      },
      {
        "entities": [
          [
            "7",
            "CARDINAL"
          ]
        ],
        "line": "7. Signatures:",
        "predicted_class": 6
      },
      {
        "entities": [
          [
            "Spencer PLC",
            "ORG"
          ]
        ],
        "line": "Spencer PLC",
        "predicted_class": 6
      },
      {
        "entities": [],
        "line": "Date: ____________________",
        "predicted_class": 6
      },
      {
        "entities": [
          [
            "Cruz Ltd",
            "ORG"
          ]
        ],
        "line": "Cruz Ltd",
        "predicted_class": 6
      },
      {
        "entities": [],
        "line": "Date: ____________________",
        "predicted_class": 6
      }
    ])
    useEffect(()=>{
      console.log("yes")
        let Entities = []
        doc.forEach((element)=>{
          Entities=Entities.concat(element.entities)
        })
        setEntities(Entities)
    }, [doc])
  return (
    <div className={`${className} flex justify-between mx-auto`}>
        <Left className='w-7/12' doc={doc}/>
        <Right className='w-4/12 mt-20' entities={entities} />
    </div>
  )
}

export default View