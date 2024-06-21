import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Progress from "./Pages/Progress";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Rotator from "./components/Rotator";
import {Routes, Route} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import View from "./Pages/View";
import "./App.css"
function App() {
  const [pathname, setPathname] = useState(null);
  const location = useLocation();
  const [doc, setDoc] = useState([])
    



  // Get Path
  const getLocation = ()=>{
    setPathname(location.pathname.slice(1,))
  }
  
  useEffect(()=>{
    getLocation()
  }, [location.pathname])
  
  return (
  <>
      <Rotator className="w-80" pathname={pathname} />
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home className="w-9/12 h-full" />} />
        <Route path="/progress" element={<Progress setDoc={setDoc} className="w-9/12 h-full" />} />
        <Route path="/view" element={<View doc={doc} setDoc={setDoc} className="w-9/12 h-full" />} />
      </Routes>
      <Footer className="absolute bottom-0 w-full" />

  </>
  );
}

export default App;
