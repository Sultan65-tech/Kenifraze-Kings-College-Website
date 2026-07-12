import React from "react"
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Card from "../Components/Card"
import Eventcard from "../Components/Eventcard"
import Contact from "../Components/Contact"
import Footer from "../Components/Footer"
import Floating from "../Components/Floating"
import Entertain from "../Components/Entertain"
const Home = ()=>{
    const handleShow = (event)=>{
        // alert("event.target.value")
        console.log("nnn");
        

    }
 return (
    <>
<Navbar/>
<Hero/>

{/*  PRINCIPAL MESSAGE  */}

<section className="principal-section">

    <div className="principal-container">

        <div className="principal-image">
            <img src="./IMAGES/principal.jpg" alt="Principal" />
        </div>

        <div className="principal-content">

            <span className="section-tag">MESSAGE FROM THE PRINCIPAL</span>

            <h2>Welcome to Kenifraze Kings College</h2>

            <p>
                At Kenifraze Kings College, we believe that education is more
                than acquiring knowledge—it is about building character,
                developing leadership, and inspiring a lifelong love for learning.
            </p>

            <p>
                Our commitment is to provide a supportive and innovative
                learning environment where every student can discover their
                strengths, achieve academic excellence, and grow into
                responsible global citizens.
            </p>

            <p>
                Together with our dedicated teachers and supportive parents,
                we strive to nurture future leaders who will make a positive
                impact in society.
            </p>

            <h4>— Principal, Kenifraze Kings College</h4>

        </div>

    </div>

</section>


{/* <!-- ACTIVITIES --> */}
<section className="activities">

    <div className="section-header">
        <span>OUR ACTIVITIES</span>
        <h2>Explore. Learn. Excel.</h2>
        <p>
            We offer a wide range of co-curricular and extracurricular
            activities that help students discover their talents,
            build confidence, and grow as leaders.
        </p>
        
    </div>

{/* Card */}
  <div className="activities-grid">

       <Card img="./IMAGES/science.jfif" title="Science Club" content="Encouraging curiosity and innovation through experiments, projects and exhibitions."/>
       <Card img="./IMAGES/singing_student.png" title="Music & Drama" content="    Nurturing creativity and expression through music,dance and stage performances."/>
       <Card img="./IMAGES/football-removebg-preview.png" title="Sports" content=" Building teamwork, discipline and resilience through indoor and outdoor sporting activities."/>
       <Card img="./IMAGES/COVER5.jpeg" title="Clubs & Societies" content="Developing leadership and communication skills through various student clubs."/>
       {/* <Card img="./IMAGES/singing_student.png" title="Music & Drama" content=""/>
       <Card img="./IMAGES/singing_student.png" title="Music & Drama" content=""/> */}

</div>
  <div className="activity-btn">
        <a href="#">View All Activities</a>
    </div>

    </section>


{/* EVENTS */}

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
<Eventcard img="./IMAGES/COVER8.jpeg" date=" 15 June, 2026" title="Graduation Ceremony 2026" text="Celebrating the achievements of our graduating students as they move to the next phase of their journey."/>
<Eventcard img="./IMAGES/COVER9.jpeg" date=" 08 June, 2026" title="Annual Inter-House Sports" text=" Students showcased their athletic talents in various sporting competitions and team events."/>
<Eventcard img="./IMAGES/COVER5.jpeg" date="  02 June, 2026" title="Science & Innovation Fair" text="   Students presented creative projects and innovative solutions to real-world challenges"/>
<Eventcard img="./IMAGES/COVER2.jpeg" date="  02 June, 2029" title="" text=""/>
<Eventcard img="./IMAGES/COVER3.jpeg" date="08 April, 2026" title="" text=""/>


 </div>
    </section>


{/* ACADEMICS */}


<section className="academics">

    <div className="section-header">
        <span>ACADEMICS</span>
        <h2>Our Academic Programs</h2>
        <p>
            We provide a comprehensive curriculum designed to equip students
            with the knowledge and skills needed for future success.
        </p>
    </div>

    <div className="academics-grid">

        <div className="academic-card">
            <h3>Junior Secondary School</h3>
            <p>
                Building strong foundations in core subjects while nurturing
                creativity and critical thinking.
            </p>
        </div>

        <div className="academic-card">
            <h3>Senior Secondary School</h3>
            <p>
                Preparing students for higher education through specialized
                Science, Arts and Commercial studies.
            </p>
        </div>

        <div className="academic-card">
            <h3>ICT & Innovation</h3>
            <p>
                Equipping students with digital skills, coding knowledge,
                and technology awareness.
            </p>
        </div>

    </div>

</section>

{/* GALLERY SECTION */}

<section className="gallery">
    
<Entertain/>
</section>


{/* <!-- TESTIMONIAL --> */}

<section className="testimonials">

    <div className="section-header">
        <span>TESTIMONIALS</span>
        <h2>What People Say About Us</h2>
    </div>

    <div className="testimonial-grid">

        <div className="testimonial-card">
            <p>
                "Kenifraze Kings College has greatly improved my child's
                confidence and academic performance."
            </p>
            <h4>— Parent</h4>
        </div>

        <div className="testimonial-card">
            <p>
                "The teachers are supportive and the learning environment
                encourages excellence."
            </p>
            <h4>— Student</h4>
        </div>

        <div className="testimonial-card">
            <p>
                "My years at Kenifraze Kings College prepared me for
                university and leadership opportunities."
            </p>
            <h4>— Alumni</h4>
        </div>

    </div>

</section>



{/* <!-- QUICK LINKS --> */}
<section className="quick-links">

    <h2 className="section-title">Quick Links</h2>

    <div className="cards">

        <div className="card">
            <h3>Latest News</h3>
            <p>Stay updated with school announcements and achievements.</p>
        </div>

        <div className="card">
            <h3>School Calendar</h3>
            <p>View important academic dates and upcoming activities.</p>
        </div>

        <div className="card">
            <h3>Student Portal</h3>
            <p>Access learning resources and student information.</p>
        </div>

    </div>

</section>
<Contact/>
<Footer/>
{/* 
 <!-- 
    - #BACK TO TOP
  --> */}

    <a
      href="#top"
      className="back-top-btn"
      aria-label="Back to top"
      data-back-top-btn
    >
        UP
      <ion-icon name="arrow-up"></ion-icon>
    </a>
</>
 )   
}


export default Home