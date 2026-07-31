import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Footer from "../Components/Footer"
import Card from "../Components/Card"
import "../styles/App.css"
const Academics = ()=>{
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

       <Card img="./IMAGES/science.jfif" title="Science Club" content="Encouraging curiosity and innovation through experiments, projects and exhibitions."/>
       <Card img="./IMAGES/singing_student.png" title="Music & Drama" content="    Nurturing creativity and expression through music,dance and stage performances."/>
       <Card img="./IMAGES/football-removebg-preview.png" title="Sports" content=" Building teamwork, discipline and resilience through indoor and outdoor sporting activities."/>
       <Card img="./IMAGES/COVER5.jpeg" title="Clubs & Societies" content="Developing leadership and communication skills through various student clubs."/>
       {/* <Card img="./IMAGES/singing_student.png" title="Music & Drama" content=""/>
       <Card img="./IMAGES/singing_student.png" title="Music & Drama" content=""/> */}

</div>
 </section>

<Footer/>
</>
 )   
}


export default Academics