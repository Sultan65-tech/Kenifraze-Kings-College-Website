import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/customer.style.css";
import usePromotion from "../store/usePromotion";
import DeskCustomerSkeleton from "../skeletons/DeskCustomerSkeleton";
import MobileCustomerSkeleton from "../skeletons/MobileCustomerSkeleton";
import { IoMdSearch } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiExport } from "react-icons/bi";
import api from "../libs/api";
import PopupWindow from "../components/PopupWindow";

const Promotion = () => {
	document.title =
		"Donors Management -Kenifraze Kings College Admin Dashboard";
	const {
		promotions,
		loading,
		totalPages,
		totalPromotions,
		currentPage,
		getPromotion,
		deleteCustomer,
		acceptPromotion,
		isDeleting
	} = usePromotion();

	const [selectedService, setService] = useState(null);
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("");
	const [sortBy, setSortBy] = useState("newest");

	// ---- FILTER API CALL ----
	useEffect(() => {
		const timer = setTimeout(() => {
			getPromotion({
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
		getPromotion({
			page,
			search,
			status,
			sortBy
		});
	};

	// ---- EXPORT CSV ----
	const exportCSV = () => {
		const headers = [
			"Name",
			"Phone",
			"Email",
			"Orders",
			"Date/Time",
			"Payment Status"
		];
		const rows = promotions.map(user => [
			user?.name,
			user?.phone,
			user?.price,
			user?.orders,
			user?.createdAt
				? new Date(user?.createdAt).toISOString().split("T")[0]
				: "",
			user?.status
		]);
		let csvContent = [
			headers.join(","),
			...rows.map(row => row.join(","))
		].join("\n");
		const blob = new Blob(
			[
				csvContent +
					"\nCreated By - Ghs Julian\nContact - +8801302661227"
			],
			{
				type: "text/csv;charset=utf-8;"
			}
		);
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "total-promotion.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// ---- EXPORT JSON ----
	const exportJSON = () => {
		// Used a shallow copy spread instead of mutating state via .push() directly
		let rows = [...promotions];
		rows.push({
			developer: "Ghs Julian",
			contact: "+8801302661227"
		});
		let content = JSON.stringify(rows, null, 4);
		const blob = new Blob([content], {
			type: "application/json;charset=utf-8;"
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "total-promotion.json");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
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
							All Donors ({totalPromotions})
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
							id="statusFilter"
							value={status}
							onChange={e => setStatus(e.target.value)}
						>
							<option value="">All Status</option>
							<option value="unpaid">UNPAID</option>
							<option value="paid">PAID</option>
							<option value="pending">PENDING</option>
						</select>
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
							onClick={exportCSV}
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
							<BiExport
								size={20}
								style={{ marginBottom: "3px" }}
							/>
							<span>Export CSV</span>
						</button>
						<button
							id="export-btn"
							onClick={exportJSON}
							style={{
								background: "#106f7c",
								color: "white",
								border: "none",
								padding: "7px 15px",
								borderRadius: "12px",
								display: "flex",
								justifyContent: "center",
								aliginItems: "center",
								cursor: "pointer",
								marginLeft: ".5rem"
							}}
						>
							<BiExport
								size={20}
								style={{ marginBottom: "3px" }}
							/>
							<span>Export JSON</span>
						</button>
					</div>
					{/*---> Desktop Tables <----*/}
					<div className="table-container">
						<table id="customersTable">
							<thead>
								<tr>
									<th> First Name</th>
									<th> Last Name</th>
									{/* <th>Phone/Contact</th> */}
									<th>Email</th>
									<th>Amount</th>
									<th>Payment Status</th>
									<th>Action/Manage</th>
								</tr>
							</thead>
							<tbody id="tableBody">
								{loading ? (
									<DeskCustomerSkeleton />
								) : promotions.length > 0 ? (
									promotions.map((user, index) => (
										<tr
											id={`#desk-item-${index}`}
											key={user._id}
										>
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
												{"$"+user.price + ".00" || "--"}
											</td>
											<td>
												<span
													className={`status ${user.status || "UNPAID"}`}
												>
													{user.status?.toUpperCase() ||
														"UNPAID"}
												</span>
											</td>
											<td>
												{user?.promotion_type || "--"}
											</td>
											<td>
												<div className="action-user">
													<NavLink
														onClick={e => {
															e.preventDefault();
															setService(user);
														}}
														id="edit"
														to="#"
													>
														View
													</NavLink>
													<NavLink
														onClick={e => {
															e.preventDefault();
															deleteCustomer(
																user?._id
															);
														}}
														id="del"
														to="#"
													>
														Delete
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
							promotions?.length > 0 &&
							promotions.map((customer, index) => (
								<div
									key={customer._id}
									id={`mobile-item-${index}`}
									className="mobile-card"
								>
									<span
										className="service-type"
										id="info-tag"
									>
										Service Type :{" "}
										{customer?.promotion_type || "N/A"}
									</span>
									{customer?.promotion_type ===
										"PROMOTION ON SITE" && (
										<>
											<img
												src={
													api +
													"/" +
													customer?.albumAvatar
												}
												alt="Album Cover Image"
											/>
											<br />
											<audio controls>
												<source
													src={
														api +
														"/" +
														customer?.musicSrc
													}
												/>
												Your browser does not support
												the audio element.
											</audio>
										</>
									)}
									{customer?.promotion_type === "SITE_SERVICE_PACKAGE" && <>
									<span id="info-tag">
										Stream URL : {customer.stream_url}
									</span>
									<span id="info-tag">
										Service Duration : {customer.duration}
									</span>
									</>
									}
									<span id="info-tag">
										Artist Name : {customer.name}
									</span>
									{customer?.song_title && (
										<span id="info-tag">
											Song Title : {customer.song_title}
										</span>
									)}
									<span id="info-tag">
										Artist UID :{" "}
										{customer?.userId.slice(0, 12) +
											"..." || index + 1}
									</span>
									<span id="info-tag">
										Service ID :{" "}
										{customer?._id.slice(0, 12) + "..." ||
											index + 1}
									</span>
									<span id="info-tag">
										PID :{" "}
										{customer?.paymentInfo
											?.payment_intent || "N/A"}
									</span>
									<span id="info-tag">
										Phone Number : {customer.phone}
									</span>
									<span id="info-tag">
										Email Address : {customer.email}
									</span>
									<span id="info-tag">
										Order Date :{" "}
										{customer.createdAt
											? new Date(customer.createdAt)
													.toISOString()
													.split("T")[0]
											: "N/A"}
									</span>
									{customer?.promotion_type ===
										"DIRECT CONSULTATION" && (
										<>
											<br />
											<hr />
											<span id="info-tag">
												Consultation Hours :{" "}
												{customer?.hour || "N/A"}
											</span>
											<span id="info-tag">
												Consultation Date :{" "}
												{customer?.date || "N/A"}
											</span>
											<span id="info-tag">
												Consultation Time :{" "}
												{customer?.time +
													" - " +
													addHoursToTime(
														customer?.time,
														parseInt(customer?.hour)
													) || "N/A"}
											</span>
										</>
									)}
									<span id="info-tag">
										Service Price :{" "}
										{"$" + customer?.price + ".00" || "N/A"}
									</span>
									<div
										id="info-tag"
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "space-between",
											aliginItems: "center"
										}}
									>
										<span>Payment Status : </span>
										<span
											className={`status ${customer?.status?.toLowerCase() || "unpaid"}`}
										>
											{customer.status?.toUpperCase() ||
												"UNPAID"}
										</span>
									</div>
									<div className="action-user">
										<NavLink
											id="edit"
											className={
												customer?.is_Accept || ""
											}
											to="#"
											onClick={e => {
												e.preventDefault();
												acceptPromotion(customer?._id);
											}}
										>
											<span>
												{customer?.is_Accept ||
													"Accept"}
											</span>
										</NavLink>
										{/*<span>Action</span>*/}
										<NavLink
											onClick={e => {
												e.preventDefault();
												deleteCustomer(customer?._id);
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
						{!loading && promotions?.length == 0 && (
							<div className="mobile-card">
								<h3 style={{ textAlign: "center" }}>
									No Record Found in Server
								</h3>
							</div>
						)}

						{/* PAGINATION */}
						{promotions.length !== 0 && (
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

export default Promotion;
