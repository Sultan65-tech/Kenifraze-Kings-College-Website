import React from "react"
import Floating from "./Floating"
import { useState } from "react"
const Eventcard = (props)=>{
    const [activeImage,setActiveImage] = useState(null)
    const current_image = props.ImageUrl;
    return (
        <>
   
        <div className="event-card">
            <img src={current_image} alt="Graduation Ceremony" onClick={()=>{setActiveImage(current_image)}}/>

            <div className="event-content">
                <div className="event-date">
                  {props.date}
                </div>

                <h3>{props.title}</h3>

                <p>
                {props.desc}
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