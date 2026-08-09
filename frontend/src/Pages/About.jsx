import { useState,useEffect } from "react"
import axios from "axios"
import NavBar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero"
import InstructorCard from "../Components/InstructorCard"
import "../styles/About.css";
import Novalue from "../Components/Novalue.jsx"
import Loader from "../Components/Loader.jsx"
const About = ()=>{
    const [data,setData]= useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
  async  function fetchData(){
    try {
        setLoading(true)
         // ⏱️ FORCE A 2-SECOND DELAY TO VIEW THE LOADER
            await new Promise((resolve) => setTimeout(resolve, 3000))
        const res = await axios.get("http://localhost:5000/api/admin/instructor")
    setData(res.data)
    } catch (error) {
        console.log("Error fetching :" + error); 
    }finally{
        setLoading(false)
    }
    }
    fetchData();
    },  [])
 return (
<>
<NavBar/>

 {/* <Hero/> */}

    <main>
      
        <section className="about-intro">
            <div className="intro-text">
                <h2>Our Vision for Excellence</h2>
                <p>Kenifraze Kings College has been at the forefront of modern education for over two decades. We foster an inclusive environment where intellectual curiosity is paired with social responsibility.</p>
                <p>Our curriculum is designed to stimulate critical thinking and creativity, preparing students not just for higher education, but for the dynamic challenges of tomorrow's global landscape.</p>
                <div className="social-media">
                    facebook
                </div>
            </div>
            <div className="intro-image">
                <img src="./IMAGES/graduands.jpg" alt="Students studying together"/>
            </div>
        </section>

      
        <section className="faculty-section">
            <div className="section-title">
                <h2>Meet Our Instructors</h2>
                <p>Learn from a dedicated team of passionate educators and subject matter experts committed to helping every student thrive.</p>
            </div>

            <div className="faculty-grid">
               {
             loading ? (
                <Loader/>
             ): data.length === 0 ? (
                <Novalue value="Teacher"/>
             ):(
                   data.map((teacher)=>{
                    return (
                    <InstructorCard key={teacher._id} img={teacher.ImageUrl} name={teacher.name} subject={teacher.subject} bio={teacher.bio} />
                    )
                })
             )
               }
            </div>
        </section>
    </main>
<Footer/>
</>
 )   
}


export default About