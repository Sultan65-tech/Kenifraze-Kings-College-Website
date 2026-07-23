import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/customer.style.css";
import useArtist from "../store/useArtist";
import DeskCustomerSkeleton from "../skeletons/DeskCustomerSkeleton";
import MobileCustomerSkeleton from "../skeletons/MobileCustomerSkeleton";
import { IoMdSearch } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiExport } from "react-icons/bi";
import api from "../libs/api";
import PopupWindow from "../components/PopupWindow";

const ArtistPage = () => {
	document.title =
		"Artists Management -All  Bizz Entertainment Admin Dashboard";
	const {
		artists,
		loading,
		totalPages,
		totalArtist,
		currentPage,
		getArtist,
		deleteArtist,
		isDeleting,
		setEdit
	} = useArtist();

	const navigate = useNavigate();
	const [selectedService, setService] = useState(null);
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("");
	const [sortBy, setSortBy] = useState("newest");

	// ---- FILTER API CALL ----
	useEffect(() => {
		const timer = setTimeout(() => {
			getArtist({
				page: 1,
				search,
				status,
				sortBy
			});
		}, 1100);

		return () => clearTimeout(timer);
	}, [search, status, sortBy]);

	// ---- PAGE CHANGE ----
	const handlePageChange = page => {
		getArtist({
			page,
			search,
			status,
			sortBy
		});
	};

	const addHoursToTime = (time, hoursToAdd) => {
		const [hours, minutes] = time.split(":").map(Number);
		const date = new Date();
		date.setHours(hours, minutes, 0, 0);
		date.setHours(date.getHours() + hoursToAdd);
		return date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false
		});
	};

	return (
		<>
			{selectedService && (
				<PopupWindow
					customer={selectedService}
					setService={setService}
				/>
			)}
			<div className="main-content">
				<div className="container">
					<div className="page-header">
						<h1 className="page-title">
							All Artists - ({totalArtist})
						</h1>
					</div>
					<div className="controls">
						<div className="search-box">
							<IoMdSearch size={22} />
							<input
								type="text"
								id="searchInput"
								placeholder="Search by name, phone or email..."
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
						</div>
						<select
							id="sortBy"
							value={sortBy}
							onChange={e => setSortBy(e.target.value)}
						>
							<option value="name">Sort by Name</option>
							<option value="email">Sort by Email</option>
							<option value="phone">Sort by Phone</option>
							<option value="_id">Sort by ID</option>
							<option value="date">Sort Join Date</option>
						</select>
						<button
							id="export-btn"
							onClick={e => navigate("/add-artist")}
							style={{
								background: "var(--primary)",
								color: "white",
								border: "none",
								padding: "7px 15px",
								borderRadius: "12px",
								display: "flex",
								justifyContent: "center",
								aliginItems: "center",
								cursor: "pointer"
							}}
						>
							<span>+</span>
							<span>Add Artist</span>
						</button>
					</div>
					{/*---> Desktop Tables <----*/}
					<div className="table-container">
						<table id="customersTable">
							<thead>
								<tr>
									<th>Index ID</th>
									<th>Artist Image</th>
									<th>Artist Name</th>
									<th>Phone/Contact</th>
									<th>Email Address</th>
									<th>Action/Manage</th>
								</tr>
							</thead>
							<tbody id="tableBody">
								{loading ? (
									<DeskCustomerSkeleton />
								) : artists.length > 0 ? (
									artists.map((user, index) => (
										<tr
											id={`#desk-item-${index}`}
											key={user._id}
										>
											<td>{index + 1} </td>
											<td>
												{" "}
												<img
													src={api + "/" + user.image}
													alt="Artist image"
												/>
											</td>
											<td>
												<strong className="customer-name">
													{user.name ||
														user?.artistName}
												</strong>
											</td>
											<td>{user.phone}</td>
											<td>
												<strong>
													{user.email || "N/A"}
												</strong>
											</td>
											<td>
												<div className="action-user">
													<NavLink
														onClick={e => {
															e.preventDefault();
															setEdit(user);
															navigate(
																"/edit-artist?id=" +
																	user?._id
															);
														}}
														id="edit"
														to="#"
													>
														<FiEdit size={17} />
													</NavLink>
													<NavLink
														onClick={e => {
															e.preventDefault();
															deleteArtist(
																user?._id
															);
														}}
														id="del"
														to="#"
													>
														<AiOutlineDelete
															size={18}
														/>
													</NavLink>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan="7"
											style={{
												textAlign: "center",
												padding: "30px"
											}}
										>
											No Record Found in Server
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
					{/**/}
					<div id="mobileCards">
						{loading ? (
							<MobileCustomerSkeleton />
						) : (
							artists?.length > 0 &&
							artists.map((customer, index) => (
								<div
									key={customer._id}
									id={`mobile-item-${index}`}
									className="mobile-card"
								>
									<img
										src={api + "/" + customer?.image}
										alt="Artist Image"
									/>
									<br />
									<span id="info-tag">
										Artist UID :{" "}
										{customer?._id.slice(0, 12) + "..." ||
											index + 1}
									</span>
									<span id="info-tag">
										Artist Name : {customer.name}
									</span>
									<span id="info-tag">
										Phone Number : {customer.phone}
									</span>
									<span id="info-tag">
										Email Address : {customer.email}
									</span>
									<span id="info-tag">
										Created Date :{" "}
										{customer.createdAt
											? new Date(customer.createdAt)
													.toISOString()
													.split("T")[0]
											: "N/A"}
									</span>
									<div className="action-user">
										<NavLink
											id="edit"
											to="#"
											onClick={e => {
												e.preventDefault();
												setEdit(customer);
												navigate(
													"/edit-artist?id=" +
														customer?._id
												);
											}}
										>
											<span>Edit</span>
										</NavLink>
										{/*<span>Action</span>*/}
										<NavLink
											onClick={e => {
												e.preventDefault();
												deleteArtist(customer?._id);
											}}
											id="del"
											to="#"
										>
											<span>
Delete
											</span>
										</NavLink>
									</div>
								</div>
							))
						)}
						{!loading && artists?.length == 0 && (
							<div className="mobile-card">
								<h3 style={{ textAlign: "center" }}>
									No Record Found in Server
								</h3>
							</div>
						)}

						{/* PAGINATION */}
						{artists.length !== 0 && (
							<div className="pagination" id="pagination">
								<div
									className="page-btn"
									onClick={() => {
										if (currentPage > 1) {
											handlePageChange(currentPage - 1);
										}
									}}
								>
									Prev
								</div>
								{Array.from(
									{ length: totalPages },
									(_, index) => (
										<div
											key={index + 1}
											className={`page-btn ${
												currentPage === index + 1
													? "active"
													: ""
											}`}
											onClick={() =>
												handlePageChange(index + 1)
											}
										>
											{index + 1}
										</div>
									)
								)}
								<div
									className="page-btn"
									onClick={() => {
										if (currentPage < totalPages) {
											handlePageChange(currentPage + 1);
										}
									}}
								>
									Next
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ArtistPage;
