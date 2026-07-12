import React from "react"

const Eventcard = (props)=>{
    return (
        <>
   
        <div className="event-card">
            <img src={props.img} alt="Graduation Ceremony"/>

            <div className="event-content">
                <div className="event-date">
                    15 June, 2026
                </div>

                <h3>Graduation Ceremony 2026</h3>

                <p>
                    Celebrating the achievements of our graduating students
                    as they move to the next phase of their journey.
                </p>
                <a href="#">Read More →</a>
            </div>
        </div>

        </>
    )
}

export default Eventcard;