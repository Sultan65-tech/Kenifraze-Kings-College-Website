import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { LuCircleUserRound } from "react-icons/lu";
import { BsBell } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import useUI from "../store/useUI";

const Header = () => {
	const { setMenu } = useUI();

	return (
		<div className='topbar' id='topbar'>
			<h3>Admin Dashboard</h3>
			<div className='right-bar'>
				<NavLink to='#'>
					<BsBell size={20} />
				</NavLink>
				<NavLink to='#'>
					<LuCircleUserRound size={21} />
				</NavLink>
				<button onClick={setMenu}>
					<IoMdMenu size={25} />
				</button>
			</div>
		</div>
	);
};

export default Header;
