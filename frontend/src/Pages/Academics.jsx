import { useState,useEffect } from "react"
import axios from "axios"
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Footer from "../Components/Footer"
import Card from "../Components/Card"
import "../styles/App.css"
import Novalue from "../Components/Novalue.jsx"
import Loader from "../Components/Loader.jsx"

const Academics = ()=>{
  const [data,setData]= useState([])
  const [loading,setLoading]= useState(true)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        setLoading(true)
             // ⏱️ FORCE A 2-SECOND DELAY TO VIEW THE LOADER
            await new Promise((resolve) => setTimeout(resolve, 4000))
        const res = await axios.get("http://localhost:5000/api/admin/academic");
        setData(res.data);
      } catch (error) {
        console.log("Error while attempting to fetch :" + error );    
    }finally{
    setLoading(false)
  }
}
    fetchData();
  },[])
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
  loading ? (
    <Loader />
  ) : data.length === 0 ? (
    <Novalue value="Academics" />
  ) : (
    data.map((academic) => (
      <Card
        key={academic._id}
        img={academic.ImageUrl}
        title={academic.title}
        desc={academic.description}
      />
    ))
  )
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