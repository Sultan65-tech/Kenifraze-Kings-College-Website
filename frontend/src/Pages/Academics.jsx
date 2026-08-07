import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Footer from "../Components/Footer"
import Card from "../Components/Card"
import {Academic} from "../../mockup/Data.js"
import "../styles/App.css"
import { useState } from "react"
const Academics = ()=>{
  const [academics,setAcademics] = useState([])
 return (
<>
<Navbar/>
<Hero/>
<div className="heading">
  <h1>Academics Updates</h1>
</div>
<section className="activities">
<div className="categories">
  <div className="category">
   <a href="#">Curriculum</a>
  </div>
   <div className="category">
    <a href="#">Announcement</a>
   </div>
    <div className="category">
      <a href="#">Admission</a>
    </div>
</div>
  <div className="activities-grid">
    {
      Academic.map((academic)=>{
        return (
        <Card key={academic.id} title={academic.title}  img={academic.ImageUrl} desc={academic.description} />
        )
      })
    }
{/* 
       <Card img="./IMAGES/science.jfif" title="Science Club" desc="Encouraging curiosity and innovation through experiments, projects and exhibitions."/>
       <Card img="./IMAGES/singing_student.png" title="Music & Drama" desc="    Nurturing creativity and expression through music,dance and stage performances."/>
       <Card img="./IMAGES/football-removebg-preview.png" title="Sports" desc=" Building teamwork, discipline and resilience through indoor and outdoor sporting activities."/> */}


</div>
 </section>

<Footer/>
</>
 )   
}


export default Academics