import React from "react"

const Card = (props)=>{
 return (
<div className="activity-card">
            <img src={props.img} />
            <div className="activity-content">
                <h3>{props.title}</h3>
                <p>{props.content}</p>
                <a href="#">Learn More →</a>
            </div>
            
            </div>
 )   
 
}


export default Card