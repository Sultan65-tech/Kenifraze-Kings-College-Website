import {Routes,Route} from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Academics from "./Pages/Academics"
import Event from "./Pages/Event"
import Donation from "./Pages/Donation"
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={ <Home/>}/>
      <Route path="/about" element={ <About/>}/>
      <Route path="/academics" element={ <Academics/>}/>
      <Route path="/events" element={ <Event/>}/>
      <Route path="/donation" element={ <Donation/>}/>
    </Routes>
      
    </>
  )
}

export default App
