import NavBar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero"
const About = ()=>{
 return (
<>
<NavBar/>

 <Hero/>

    <main>
      
        <section className="about-intro">
            <div className="intro-text">
                <h2>Our Vision for Excellence</h2>
                <p>Academix Academy has been at the forefront of modern education for over two decades. We foster an inclusive environment where intellectual curiosity is paired with social responsibility.</p>
                <p>Our curriculum is designed to stimulate critical thinking and creativity, preparing students not just for higher education, but for the dynamic challenges of tomorrow's global landscape.</p>
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
              
                <div className="faculty-card">
                    <div className="image-wrapper">
                        <img src="./IMAGES/Mr_promise.jpg" alt="Dr. Sarah Jenkins"/>
                    </div>
                    <div className="faculty-info">
                        <h3 className="faculty-name">Dr. Sarah Jenkins</h3>
                        <span className="faculty-subject">Mathematics & Physics</span>
                        <p className="faculty-bio">Ph.D. in Applied Mathematics from MIT. Dr. Jenkins brings over 12 years of experience making calculus interactive and accessible.</p>
                    </div>
                </div>

               
                <div className="faculty-card">
                    <div className="image-wrapper">
                        <img src="./IMAGES/Mrs_Unknown.jpg" alt="Marcus Vance"/>
                    </div>
                    <div className="faculty-info">
                        <h3 className="faculty-name">Marcus Vance</h3>
                        <span className="faculty-subject">English & Literature</span>
                        <p className="faculty-bio">MA in Creative Writing. Marcus is passionate about helping students find their unique voices through prose, drama, and classical poetry.</p>
                    </div>
                </div>

            
                <div className="faculty-card">
                    <div className="image-wrapper">
                        <img src="./IMAGES/Mum_aliyah.jpg" alt="Elena Rostova"/>
                    </div>
                    <div className="faculty-info">
                        <h3 className="faculty-name">Elena Rostova</h3>
                        <span className="faculty-subject">Chemistry & Biology</span>
                        <p className="faculty-bio">Former research biochemist. Elena loves utilizing hands-on lab experiments to ignite curiosity about the living world.</p>
                    </div>
                </div>

                
                <div className="faculty-card">
                    <div className="image-wrapper">
                        <img src="./IMAGES/BigDaddy.jpg" alt="Kofi Mensah"/>
                    </div>
                    <div className="faculty-info">
                        <h3 className="faculty-name">Kofi Mensah</h3>
                        <span className="faculty-subject">Computer Science</span>
                        <p className="faculty-bio">Former software engineer at Google. Kofi teaches Python and web development, equipping students with essential 21st-century tech skills.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
<Footer/>
</>
 )   
}


export default About