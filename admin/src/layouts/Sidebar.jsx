import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { BsCartCheck } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { RiDashboard3Line } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";
import { IoFastFoodOutline } from "react-icons/io5";
import { SiJsonwebtokens } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import { RiWebhookFill } from "react-icons/ri";
import { MdBrowserUpdated } from "react-icons/md";
import { GrBlog } from "react-icons/gr";
import { TbMailDollar } from "react-icons/tb";
import { IoMdPhotos } from "react-icons/io";
import { RiMusicAiLine } from "react-icons/ri";
import { MdOutlineContactSupport } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { TbBrandCampaignmonitor } from "react-icons/tb";
import useAuth from "../store/useAuth";
import useUI from "../store/useUI";

const Sidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { logoutAdmin } = useAuth();
	const [path, setPath] = useState("");
	const { isMenu, setMenu } = useUI();
	useEffect(() => {
		setPath(location.pathname);
	}, [location]);

	return (
		<div className={`sidebar ${isMenu && "active"}`} id="sidebar">
			<div className="sidebar-header">
				<div className="logo">Administrator</div>
			</div>
			<div className="nav-menu">
				<NavLink
					onClick={setMenu}
					to="/"
					className={`nav-item ${path === "/" ? "active" : ""}`}
				>
					<span>
						<RiDashboard3Line
							size={20}
							style={{ marginTop: ".3rem" }}
						/>
					</span>{" "}
					<span className="nav-text">Dashboard</span>
				</NavLink>
				<NavLink
					onClick={setMenu}
					to="edit-logo"
					className={`nav-item ${path === "/edit-logo" ? "active" : ""}`}
				>
					<span>
						<SiJsonwebtokens
							size={20}
							style={{ marginTop: ".3rem" }}
						/>
					</span>{" "}
					<span className="nav-text">Edit Logo</span>
				</NavLink>
				<NavLink
					onClick={setMenu}
					to="edit-hero"
					className={`nav-item ${path === "/edit-hero" ? "active" : ""}`}
				>
					<span>
						<RiWebhookFill
							size={20}
							style={{ marginTop: ".3rem" }}
						/>
					</span>{" "}
					<span className="nav-text">Edit Hero Section</span>
				</NavLink>
				{/*
				<NavLink
					onClick={setMenu}
					to="edit-site"
					className={`nav-item ${path === "/edit-site" ? "active" : ""}`}
				>
					<span>
						<CgWebsite size={20} style={{ marginTop: ".3rem" }} />
					</span>{" "}
					<span className="nav-text">Edit Site Settings</span>
				</NavLink>

				<NavLink
					onClick={setMenu}
					to="edit-privacy"
					className={`nav-item ${path === "/edit-privacy" ? "active" : ""}`}
				>
					<span>
						<MdMenuBook size={20} style={{ marginTop: ".3rem" }} />
					</span>{" "}
					<span className="nav-text">Edit Privacy Policy</span>
				</NavLink>
				<NavLink
					onClick={setMenu}
					to="edit-terms"
					className={`nav-item ${path === "/edit-terms" ? "active" : ""}`}
				>
					<span>
						<VscGitPullRequestCreate
							size={20}
							style={{ marginTop: ".3rem" }}
						/>
					</span>{" "}
					<span className="nav-text">Edit Terms & Condition</span>
				</NavLink>
				*/}
				<NavLink
					onClick={setMenu}
					to="edit-contact"
					className={`nav-item ${path === "/edit-contact" ? "active" : ""}`}
				>
					<span>
						<MdOutlineContactSupport
							size={20}
							style={{ marginTop: ".3rem" }}
						/>
					</span>{" "}
					<span className="nav-text">Edit Contact</span>
				</NavLink>
				
				<NavLink
					onClick={setMenu}
					to="edit-about"
					className={`nav-item ${path === "/instructor" ? "active" : ""}`}
				>
					<span>
						<MdInfoOutline
							size={20}
							style={{ marginTop: ".3rem" }}
						/>
					</span>{" "}
					<span className="nav-text">Instructors </span>
				</NavLink>
				
			
				<NavLink
					onClick={setMenu}
					to="promotions"
					className={`nav-item ${path === "/promotions" ? "active" : ""}`}
				>
					<span>
						<BsCartCheck size={20} style={{ marginTop: ".3rem" }} />
					</span>{" "}
					<span className="nav-text">Donations</span>
				</NavLink>
			
			
				<NavLink
					onClick={setMenu}
					to="artists"
					className={`nav-item ${path === "/artists" ? "active" : ""}`}
				>
					<span>
						<HiOutlineUsers
							size={20}
							style={{ marginTop: ".3rem" }}
						/>
					</span>{" "}
					<span className="nav-text"> Instructor</span>
				</NavLink>
				<NavLink
					onClick={setMenu}
					to="users"
					className={`nav-item ${path === "/users" ? "active" : ""}`}
				>
					<span>
						<HiOutlineUsers
							size={20}
							style={{ marginTop: ".3rem" }}
						/>
					</span>{" "}
					<span className="nav-text">Academics</span>
				</NavLink>
			
				<NavLink
					onClick={async e => {
						e.preventDefault();
						setMenu();
						await logoutAdmin();
						navigate("/admin-login");
					}}
					id="logout-link"
					to="/admin-login"
					className={`nav-item ${path === "/logout" ? "active" : ""}`}
				>
					<span>
						<RiLogoutCircleRLine
							size={20}
							style={{ marginTop: ".3rem" }}
						/>
					</span>{" "}
					<span className="nav-text">Logout</span>
				</NavLink>
				{/*
				<NavLink
					onClick={setMenu}
					to="settings"
					className={`nav-item ${path === "/settings" ? "active" : ""}`}
				>
					<span>
						<IoSettingsOutline
							size={20}
							style={{ marginTop: ".3rem" }}
						/>
					</span>{" "}
					<span className="nav-text">Settings</span>
				</NavLink>
				*/}
			</div>
		</div>
	);
};

export default Sidebar;
