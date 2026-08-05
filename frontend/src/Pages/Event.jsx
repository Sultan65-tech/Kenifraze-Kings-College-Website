import { useEffect,useState } from "react"
import axios from "axios"
import { Events } from "../../mockup/Data.js"
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Eventcard from "../Components/Eventcard"
import Footer from "../Components/Footer"
const Event = ()=>{
    const [data,setData] =useState([])
    async function ApiCall(){
        const response =await fetch("http://localhost:3000/api/admin/event/")
        const results = await response.json();
        setData(results) 
        
        
        
    }
    ApiCall();
    //    useEffect(ApiCall(),[])

return (
    
<>
<Navbar/>
<Hero/>
 <section className="events">

    <div className="section-header">
        <span>RECENT EVENTS</span>
        <h2>Latest School Events</h2>
        <p>
            Stay updated with the latest happenings, achievements,
            competitions and special events at Kenifraze Kings College.
        </p>
    </div>

 <div className="events-grid">
    {
        Events.map((event)=>{
          return(
              <Eventcard img={event.ImageUrl} date={event.date} title={event.title} desc={event.description}/>
          )
        })
    }


 </div>
    </section>
    <Footer/>
</>
 )   
}


export default Event