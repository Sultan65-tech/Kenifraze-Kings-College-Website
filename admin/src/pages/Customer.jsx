import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/customer.style.css";
import useCustomer from "../store/useCustomer";
import DeskCustomerSkeleton from "../skeletons/DeskCustomerSkeleton";
import MobileCustomerSkeleton from "../skeletons/MobileCustomerSkeleton";
import { IoMdSearch } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiExport } from "react-icons/bi";

const Customer = () => {
	document.title =
		"Customers/Users Management - All Bizz Entertainment Admin Dashboard";
	const {
		customers,
		loading,
		totalPages,
		totalCustomers,
		currentPage,
		getCustomers,
		deleteCustomer,
		isDeleting
	} = useCustomer();
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("");
	const [sortBy, setSortBy] = useState("name");

	// ---- FILTER API CALL ----
	useEffect(() => {
		const timer = setTimeout(() => {
			getCustomers({
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
		getCustomers({
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
			"Location",
			"Join Date",
			"Status"
		];
		const rows = customers.map(user => [
			user.name,
			user.phone,
			user.location,
			user.orders,
			user.createdAt
				? new Date(user.createdAt).toISOString().split("T")[0]
				: "",
			user.status
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
		link.setAttribute("download", "total-customers.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// ---- EXPORT JSON ----
	const exportJSON = () => {
		// Used a shallow copy spread instead of mutating state via .push() directly
		let rows = [...customers];
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
		link.setAttribute("download", "total-customers.json");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="main-content">
			<div className="container">
				<div className="page-header">
					<h1 className="page-title">
						All Customers ({(totalCustomers -1)})
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
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</select>
					<select
						id="sortBy"
						value={sortBy}
						onChange={e => setSortBy(e.target.value)}
					>
						<option value="name">Sort by Name</option>
						<option value="orders">Sort by Orders</option>
						<option value="date">Sort by Join Date</option>
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
						<BiExport size={20} style={{ marginBottom: "3px" }} />
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
						<BiExport size={20} style={{ marginBottom: "3px" }} />
						<span>Export JSON</span>
					</button>
				</div>
				{/*---> Desktop Tables <----*/}
				<div className="table-container">
					<table id="customersTable">
						<thead>
							<tr>
								<th>Customer</th>
								<th>Phone/Contact</th>
								<th>Email</th>
								<th>Location</th>
								<th>Joined Date</th>
								<th>Active Status</th>
								<th>Action/Manage</th>
							</tr>
						</thead>
						<tbody id="tableBody">
							{loading ? (
								<DeskCustomerSkeleton />
							) : customers.length > 0 ? (
								customers.map((user, index) => (
									<tr
										id={`#desk-item-${index}`}
										key={user._id}
									>
										<td>
											<strong className="customer-name">
												{user.name}
											</strong>
										</td>
										<td>{user.phone}</td>
										<td>
											<strong>
												{user.email || "N/A"}
											</strong>
										</td>
										<td>{user.location || "--"}</td>
										<td>
											{user.createdAt
												? new Date(user.createdAt)
														.toISOString()
														.split("T")[0]
												: "N/A"}
										</td>
										<td>
											<span
												className={`status ${user.status || "active"}`}
											>
												{user.status?.toUpperCase() ||
													"Active"}
											</span>
										</td>
										<td>
											<div className="action-user">
												{/*
												<NavLink
													id='edit'
													to={`edit-customer?customerId=${user?._id}`}>
													<FiEdit size={17} />
												</NavLink>
												*/}
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
										No user found
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
					) : customers?.length > 0 ? (
						customers.map((customer, index) => (
							<div
								key={customer._id}
								id={`mobile-item-${index}`}
								className="mobile-card"
							>
								<span id="info-tag">
									Name : {customer.name}
								</span>
								<span id="info-tag">
									UID : {customer?._id || index + 1}
								</span>
								<span id="info-tag">
									Phone : {customer.phone}
								</span>
								<span id="info-tag">
									Email : {customer.email}
								</span>
								<span id="info-tag">
									Joined Date :{" "}
									{customer.createdAt
										? new Date(customer.createdAt)
												.toISOString()
												.split("T")[0]
										: "N/A"}
								</span>
								<span id="info-tag">
									Location : {customer.location || "N/A"}
								</span>
								<div
									id="info-tag"
									style={{
										width: "100%",
										display: "flex",
										justifyContent: "left",
										aliginItems: "center"
									}}
								>
									<span>Active Status : </span>
									<span
										className={`status ${customer.status || "active"}`}
									>
										{customer.status?.toUpperCase() ||
											"Active"}
									</span>
								</div>
								<div className="action-user">
									{/*
									<NavLink
										id="edit"
										to={`edit-customer?customerId=${customer?._id}`}
									>
										<FiEdit size={17} />
										<span>Edit</span>
									</NavLink>
									*/}
									<span>Action</span>
									<NavLink
										onClick={e => {
											e.preventDefault();
											deleteCustomer(customer?._id);
										}}
										id="del"
										to="#"
									>
										<AiOutlineDelete size={18} />
										<span>
Delete
										</span>
									</NavLink>
								</div>
							</div>
						))
					) : (
						<div className="mobile-card">
							<h3 style={{ textAlign: "center" }}>
								No user found!
							</h3>
						</div>
					)}

					{/* PAGINATION */}
					{customers.length !== 0 && (
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
							{Array.from({ length: totalPages }, (_, index) => (
								<div
									key={index + 1}
									className={`page-btn ${
										currentPage === index + 1
											? "active"
											: ""
									}`}
									onClick={() => handlePageChange(index + 1)}
								>
									{index + 1}
								</div>
							))}
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
	);
};

export default Customer;
