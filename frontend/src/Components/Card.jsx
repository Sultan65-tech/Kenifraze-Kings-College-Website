import React, { useState } from "react"
import Floating from "./Floating";
const Card = (props)=>{
    const [activeImage,setActiveImage] = useState(null)
    const current_image = props.img;
 return (
    <>
<div className="activity-card">
            <img src={current_image} onClick={()=>{setActiveImage(current_image)}}/>
            <div className="activity-content">
                <h3>{props.title}</h3>
                <p>{props.content}</p>
                <a href="#">Learn More →</a>
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


export default Card