import {Link} from "react-router-dom"
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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/academics">Academics</Link></li>
                <li><Link to="/about">About</Link></li>
        {/* <li><a href="/">Contact</Link></li> */}
    </ul>
    <div>
          <button className="donate">Donate Now</button>
    </div>
    <div className="menu">
        <AiOutlineMenu size={"30px"} color="purple"  onClick={handleClick}/>
    </div>
</nav>
</>
 )   
}


export default Navbar