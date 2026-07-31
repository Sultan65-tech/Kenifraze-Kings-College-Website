import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Eventcard from "../Components/Eventcard"
import Footer from "../Components/Footer"
import { useEffect,useState } from "react"
import axios from "axios"
const Event = ()=>{
//     const [data,setData] =useState([])
//     async function ApiCall(){
//         const response =await fetch("http://localhost:3000/api/admin/event/")
//         console.log(response.json());
//         setData(response) 
//         ApiCall();
//     }
//    useEffect(ApiCall(),[])
  return (
<>
<Navbar/>
<Hero/>
 <section className="events">

    <div className="section-header">
        <span>RECENT EVENTS</span>
        <h2>Latest School Events</h2>
        {/* {
            data.map((datum)=>{
                alert(datum.title)
            })
        } */}
        <p>
            Stay updated with the latest happenings, achievements,
            competitions and special events at Kenifraze Kings College.
        </p>
    </div>

 <div className="events-grid">
<Eventcard img="./IMAGES/graduation.jpg" date=" 15 June, 2026" title="Graduation Ceremony 2026" text="Celebrating the achievements of our graduating students as they move to the next phase of their journey."/>
<Eventcard img="./IMAGES/program.jpg" date=" 08 June, 2026" title="Annual Inter-House Sports" text=" Students showcased their athletic talents in various sporting competitions and team events."/>
<Eventcard img="./IMAGES/graduands.jpg" date="  02 June, 2026" title="Science & Innovation Fair" text="   Students presented creative projects and innovative solutions to real-world challenges"/>
<Eventcard img="./IMAGES/graduation-2.jpg" date="  02 June, 2029" title="" text=""/>
<Eventcard img="./IMAGES/graduation-3.jpg" date="08 April, 2026" title="" text=""/>


 </div>
    </section>
    <Footer/>
</>
 )   
}


export default Event