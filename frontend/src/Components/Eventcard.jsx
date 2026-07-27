import React from "react"
import Floating from "./Floating"
import { useState } from "react"
const Eventcard = (props)=>{
    const [activeImage,setActiveImage] = useState(null)
    const current_image = props.img;
    return (
        <>
   
        <div className="event-card">
            <img src={current_image} alt="Graduation Ceremony" onClick={()=>{setActiveImage(current_image)}}/>

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

        
  {/* Conditional rendering Large View */}
 {activeImage && (
<Floating
imageSrc={activeImage}
onClose={()=>{setActiveImage(null)}}
/>
  )}
        </>
    )
}

export default Eventcard;