import NavBar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero"
import InstructorCard from "../Components/InstructorCard"
import "../styles/About.css";

const About = ()=>{
    const Data = [
        {
    id: 1,
    image:"jj.jpg",
    name: 'Dr. Marc Song',
    subject:"Physics",
    bio: 'Ph.D. in Applied Mathematics from MIT. Specializes in quantum mechanics and advanced calculus.'
},
   {
    id: 2,
    image:"jj.jpg",
    name: 'Dr. Marc Song',
    subject:"Physics",
    bio: 'Ph.D. in Applied Mathematics from MIT. Specializes in quantum mechanics and advanced calculus.'
},
   {
    id: 3,
    image:"jj.jpg",
    name: 'Dr. Marc Song',
    subject:"Physics",
    bio: 'Ph.D. in Applied Mathematics from MIT. Specializes in quantum mechanics and advanced calculus.'
  },
  {
      id: 4,
    image:"jj.jpg",
    name: 'Dr. Marc Song',
    subject:"Physics",
    bio: 'Ph.D. in Applied Mathematics from MIT. Specializes in quantum mechanics and advanced calculus.'
},
{
    id: 5,
    image:"jj.jpg",
    name: 'Dr. Marc Song',
    subject:"Physics",
    bio: 'Ph.D. in Applied Mathematics from MIT. Specializes in quantum mechanics and advanced calculus.'
},
{
    id: 6,
    image:"jj.jpg",
    name: 'Dr. Marc Song',
    subject:"Physics",
    bio: 'Ph.D. in Applied Mathematics from MIT. Specializes in quantum mechanics and advanced calculus.'
},
{
    id: 7,
    image:"jj.jpg",
    name: 'Dr. Marc Song',
    subject:"Physics",
    bio: 'Ph.D. in Applied Mathematics from MIT. Specializes in quantum mechanics and advanced calculus.'
},
{
    id: 8,
    image:"jj.jpg",
    name: 'Dr. Marc Song',
    subject:"Physics",
    bio: 'Ph.D. in Applied Mathematics from MIT. Specializes in quantum mechanics and advanced calculus.'
},
{
    id: 9,
    image:"jj.jpg",
    name: 'Dr. Marc Song',
    subject:"Physics",
    bio: 'Ph.D. in Applied Mathematics from MIT. Specializes in quantum mechanics and advanced calculus.'
}
];
Data.length = 6;
 return (
<>
<NavBar/>

 <Hero/>

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
                Data.map((teacher)=>{
                    return (
                    <InstructorCard img={teacher.img} name={teacher.name} subject={teacher.subject} bio={teacher.bio} />
                    )
                })
               }
            </div>
        </section>
    </main>
<Footer/>
</>
 )   
}


export default About