import { useState,useEffect } from "react"
import { useAcademics } from "../../hooks/useAcademics.js"
import axios from "axios"
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Footer from "../Components/Footer"
import Card from "../Components/Card"
import "../styles/App.css"
import Novalue from "../Components/Novalue.jsx"
import Loader from "../Components/Loader.jsx"

const Academics = ()=>{
  const [loading,setLoading]= useState(true)
  const {data:academics,isloading} = useAcademics();
if(isloading){
  return(
    <Loader/>
  )
}
 return (
<>
<Navbar/>
{/* <Hero/> */}
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
    academics?.map((academic) => (
      <Card
        key={academic._id}
        img={academic.ImageUrl}
        title={academic.title}
        desc={academic.description}
      />
    ))
  
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