import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Progress from "./Pages/Progress";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Rotator from "./components/Rotator";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import View from "./Pages/View";
import "./App.css"
import Create from "./Pages/Create";
import Compare from "./Pages/Compare";
function App() {
  const navigate = useNavigate();
  const [pathname, setPathname] = useState(null);
  const location = useLocation();
  const [doc, setDoc] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [Test, setTest] = useState("");
  
    
  // Handle Proceed
  const OnClickProceed = (e)=>{
    if (Test){
        navigate(`/progress?file=${Test}`)
    }else{
      navigate(`/progress?file=process`)
    }
  }
    

  // Get Path
  const getLocation = ()=>{
    setPathname(location.pathname.slice(1,))
  }
  
  useEffect(()=>{
    getLocation()
  }, [location.pathname])
  
  return (
  <>
      <Rotator className="w-52 sm:w-80" pathname={pathname} />
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home selectedFile={selectedFile} setSelectedFile={setSelectedFile} OnClickProceed={OnClickProceed} Test={Test} setTest={setTest} className="w-9/12 h-full" />} />
        <Route path="/progress" element={<Progress setDoc={setDoc} selectedFile={selectedFile}  className="w-9/12 h-full" />} />
        <Route path="/view" element={<View doc={doc} setDoc={setDoc} className="w-9/12 h-full" />} />
        <Route path="/create" element={<Create className="w-10/12 sm:w-9/12 h-full" />} />
        <Route path="/compare" element={<Compare className="w-10/12 sm:w-9/12 h-full" />} />
      </Routes>
      <Footer className="sm:fixed bottom-0 w-full" />

  </>
  );
}

export default App;
