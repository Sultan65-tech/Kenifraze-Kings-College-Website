
import {AiOutlineClose } from "react-icons/ai"
const Floating = ({imageSrc, onClose})=>{
    if (!imageSrc) return null;
    return(
        <>
        <div className="preview-cotainer" onClick={onClose}>
   <button className="close-btn" onClick={onClose}><AiOutlineClose size={"40px"}/></button>
      <div className="preview-content" onClick={(e)=>e.stopPropagation()}><img src={imageSrc}  alt=""/>
    </div>

    </div>
        </>
    )
}

export default Floating