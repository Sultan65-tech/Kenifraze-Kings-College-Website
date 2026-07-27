import NavBar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero"

import  "../styles/About.css"

import InstructorCard from "../Components/InstructorCard"
const About = ()=>{
 return (
<>
<NavBar/>

 <Hero/>

    <main>
      
        <section clas bio="about-intro">
            <div clas bio="intro-text">
                <h2>Our Vision for Excellence</h2>
                <p>Academix Academy has been at the forefront of modern education for over two decades. We foster an inclusive environment where intellectual curiosity is paired with social responsibility.</p>
                <p>Our curriculum is designed to stimulate critical thinking and creativity, preparing students not just for higher education, but for the dynamic challenges of tomorrow's global landscape.</p>
            </div>
            <div clas bio="intro-image">
                <img src="./IMAGES/graduands.jpg" alt="Students studying together"/>
            </div>
        </section>

      
        <section clas bio="faculty-section">
            <div clas bio="section-title">
                <h2>Meet Our Instructors</h2>
                <p>Learn from a dedicated team of passionate educators and subject matter experts committed to helping every student thrive.</p>
            </div>

            <div clas bio="faculty-grid">
              
               <InstructorCard img="./IMAGES/Mr_promise.jpg" subject="Mathematics & Physics" bio="MARC SONG" bio="Ph.D. in Applied Mathematics from MIT. Dr. Jenkins brings over 12 years of experience making calculus interactive and accessible."/>
               <InstructorCard img="./IMAGES/Mrs_Unknown.jpg" subject="English & Literature" bio="MA in Creative Writing. Marcus is passionate about helping students find their unique voices through prose, drama, and classical poetry."/>
               <InstructorCard img="./IMAGES/Mrs_Unknown.jpg" subject="Chemistry & Biology" bio="Former research biochemist. Elena loves utilizing hands-on lab experiments to ignite curiosity about the living world."/>
               
            </div>
        </section>
    </main>
<Footer/>
</>
 )   
}


export default About