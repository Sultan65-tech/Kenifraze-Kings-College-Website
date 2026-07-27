import React from 'react'
import  "../styles/About.css"
const InstructorCard = (props) => {
  return (
   <>
    <div className="faculty-card">
                    <div className="image-wrapper">
                        <img src={props.img} alt={props.name}/>
                    </div>
                    <div className="faculty-info">
                        <h3 className="faculty-name">{props.name}</h3>
                        <span className="faculty-subject">{props.subject}</span>
                        <p className="faculty-bio">{props.bio}</p>
                    </div>
                </div>
   </>
  )
}

export default InstructorCard