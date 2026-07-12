import { useState } from "react"
import Floating from "./Floating"
const Entertain = ()=>{
    const images=[
     "./IMAGES/GALLERY3.jpeg",
     "./IMAGES/GALLERY4.jpeg",
     "./IMAGES/GALLERY5.jpeg",
     "./IMAGES/GALLERY6.jpeg",
     "./IMAGES/IMAGE2.jpeg",
     "./IMAGES/gallery4.jpg"
    ]
    const [activeImage,setActiveImage] = useState(null)
    return(
        <>
        
    <div className="section-header">
        <span>GALLERY</span>
        <h2>Life at Kenifraze Kings College</h2>
    </div>

    <div className="gallery-grid">
     {
    images.map((src,index)=>(
       <img 
       key={index} 
       src={src} 
       alt="Gallery Thumbnail" 
       onClick={()=>setActiveImage(src)}
       />
    ))
  }

  {/* Conditional rendering Large View */}
  {activeImage && (
<Floating
imageSrc={activeImage}
onClose={()=>{setActiveImage(null)}}
/>
  )}
    </div>

        </>
    )
}

export default Entertain