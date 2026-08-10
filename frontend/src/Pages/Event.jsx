import { useEffect, useState } from "react"
import axios from "axios"
import { useEvents } from "../../hooks/useEvents.js"
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Eventcard from "../Components/Eventcard"
import Footer from "../Components/Footer"
import Novalue from "../Components/Novalue.jsx"
import Loader from "../Components/Loader.jsx"
import "../styles/App.css"

const Event = () => {
    // const [data, setData] = useState([])
    const [loading, setLoading] = useState(true) // 1. Start loading as true initially

        // Uses the useEvents hook to fetch events with a limit of 5
        const {data:events,isLoading} = useEvents()


    return (
        <>
            <Navbar />
            <Hero />
            <section className="events">
                <div className="section-header">
                    <span>RECENT EVENTS</span>
                    <h2>Latest School Events</h2>
                    <p>
                        Stay updated with the latest happenings, achievements,
                        competitions and special events at Kenifraze Kings College.
                    </p>
                </div>

                {/* 3. Conditional rendering in the JSX tree */}              
                  {
                    <div className="events-grid">
                        {events?.map((event) => (
                            <Eventcard 
                                key={event._id} // 4. MongoDB uses _id instead of id
                                img={event.ImageUrl} 
                                date={event.date} 
                                title={event.title} 
                                desc={event.description}
                            />
                        ))}
                    </div>
}
            </section>
            <Footer />
        </>
    )   
}

export default Event