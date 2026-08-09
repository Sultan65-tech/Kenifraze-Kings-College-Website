import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../Components/Navbar"
import Hero from "../Components/Hero"
import Eventcard from "../Components/Eventcard"
import Footer from "../Components/Footer"
import Novalue from "../Components/Novalue.jsx"
import Loader from "../Components/Loader.jsx"
import "../styles/App.css"

const Event = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true) // 1. Start loading as true initially

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                // ⏱️ FORCE A 2-SECOND DELAY TO VIEW THE LOADER
            await new Promise((resolve) => setTimeout(resolve, 4000))
                const res = await axios.get("http://localhost:5000/api/admin/event")
                setData(res.data)
            } catch (error) {
                console.error("Error fetching events:", error)
            } finally {
                setLoading(false) // 2. Stop loading when fetch completes or fails
            }
        }
        fetchData()
    }, [])

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
                {loading ? (
                    <Loader />
                ) : data.length === 0 ? (
                    <Novalue value="Events" />
                ) : (
                    <div className="events-grid">
                        {data.map((event) => (
                            <Eventcard 
                                key={event._id} // 4. MongoDB uses _id instead of id
                                img={event.ImageUrl} 
                                date={event.date} 
                                title={event.title} 
                                desc={event.description}
                            />
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </>
    )   
}

export default Event