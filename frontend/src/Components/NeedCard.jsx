import React from 'react'
import {AiOutlineFork} from "react-icons/ai"
const NeedCard = (props) => {
  return (
    <>
      <div className="kkcf-need-card">
                            <div className="kkcf-need-icon-box kkcf-icon-indigo">{props.Icon}</div>
                            <h3 className="kkcf-need-card-title">{props.title}</h3>
                            <p className="kkcf-need-card-desc">{props.desc}</p>
                        </div>
    </>
  )
}

export default NeedCard