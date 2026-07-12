import React from "react"
import { useState } from "react"
import{ AiOutlineMenu} from "react-icons/ai"
const Navbar = ()=>{
    const[toggle,setToggle] = useState(false)
    const handleClick = ()=>{
       setToggle(!toggle)
    }
 return (
<>
<nav className="navbar">
    <div className="logo"><div className="img"><img src="./IMAGES/Logo.jpeg"/></div><div className="text"><h2>KENIFRAZE KINGS COLLEGE</h2></div></div>

    <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">News</a></li>
        <li><a href="#">Academics</a></li>
                <li><a href="#">About</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
    <div className="menu">
        <AiOutlineMenu size={"30px"} color="purple"  onClick={handleClick}/>
    </div>
</nav>
</>
 )   
}


export default Navbar