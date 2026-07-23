import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/customer.style.css";
import useFood from "../store/useFood";
import DeskCustomerSkeleton from "../skeletons/DeskCustomerSkeleton";
import MobileCustomerSkeleton from "../skeletons/MobileCustomerSkeleton";
import { IoMdSearch } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiExport } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";


const Foods = () => {
	document.title = "Customers/Users Management - GramBhoj Admin Dashboard";
	const {
		foods,
		loading,
		totalPages,
		totalFoods,
		currentPage,
		getFoods,
		deleteFood,
		isDeleting
	} = useFood();
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("");
	const [sortBy, setSortBy] = useState("name");

	// ---- FILTER API CALL ----
	useEffect(() => {
		const timer = setTimeout(() => {
			getFoods({
				page: 1,
				search,
				status,
				sortBy
			});
		}, 1100);

		return () => clearTimeout(timer);
	}, [search, status, sortBy]);

	// ---- PAGE CHANGE ----
	const handlePageChange = (page) => {
		getFoods({
			page,
			search,
			status,
			sortBy
		});
	};

	// ---- EXPORT CSV ----
	const exportCSV = () => {
		const headers = [
			"image",
			"ID",
			"foodName",
			"price",
			"category",
			"createdDate",
			"Status"
		];
		const rows = foods.map((user) => [
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
			...rows.map((row) => row.join(","))
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
		link.setAttribute("download", "gram-bhoj-foods.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// ---- EXPORT JSON ----
	const exportJSON = () => {
		// Used a shallow copy spread instead of mutating state via .push() directly
		let rows = [...foods];
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
		link.setAttribute("download", "gram-bhoj-customers.json");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className='main-content'>
			<div className='container'>
				<div className='page-header'>
					<h1 className='page-title'>All Customers ({totalFoods})</h1>
				</div>
				<div className='controls'>
					<div className='search-box'>
						<IoMdSearch size={22} />
						<input
							type='text'
							id='searchInput'
							placeholder='Search by name, phone or email...'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<select
						id='statusFilter'
						value={status}
						onChange={(e) => setStatus(e.target.value)}>
						<option value=''>All Status</option>
						<option value='active'>Active</option>
						<option value='inactive'>Inactive</option>
					</select>
					<select
						id='sortBy'
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}>
						<option value='name'>Sort by Name</option>
						<option value='orders'>Sort by Orders</option>
						<option value='date'>Sort by Join Date</option>
					</select>
					<button
						id='export-btn'
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
						}}>
						<BiExport size={20} style={{ marginBottom: "3px" }} />
						<span>Export CSV</span>
					</button>
					<button
						id='export-btn'
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
						}}>
						<BiExport size={20} style={{ marginBottom: "3px" }} />
						<span>Export JSON</span>
					</button>
				</div>
				{/*---> Desktop Tables <----*/}
				<div className='table-container'>
					<table id='customersTable'>
						<thead>
							<tr>
								<th>Thumbnail</th>
								<th>Index</th>
								<th>Name</th>
								<th>Price</th>
								<th>Category</th>
								<th>Created At</th>
								<th>Food Status</th>
								<th>Action/Manage</th>
							</tr>
						</thead>
						<tbody id='tableBody'>
							{loading ? (
								<DeskCustomerSkeleton />
							) : foods.length > 0 ? (
								foods.map((food, index) => (
									<tr
										id={`#desk-item-${index}`}
										key={food._id}>
										<td>
											<img
												src={food?.images[0]?.url}
												alt='Food Thumbnail'
											/>
										</td>
										<td>{index + 1}</td>
										<td id='food-title'>
											{food.foodName || "--"}
										</td>
										<td>
											<strong>
												{food.price || "N/A"}
											</strong>
										</td>
										<td>
											<strong>
												{food.category || "N/A"}
											</strong>
										</td>
										<td>
											{food.createdAt
												? new Date(food.createdAt)
														.toISOString()
														.split("T")[0]
												: "N/A"}
										</td>
										<td>
											<span
												className={`status ${food?.status || "inactive"}`}>
												{food?.status?.toUpperCase() ||
													"Inactive"}
											</span>
										</td>
										<td>
											<div className='action-user'>
												<NavLink
													id='view'
													to={`/view-food?foodId=${food?._id}`}>
													<IoEyeOutline size={17} />
												</NavLink>
												<NavLink
													id='edit'
													to={`/edit-food?foodId=${food?._id}`}>
													<FiEdit size={17} />
												</NavLink>
												<NavLink
													onClick={(e) => {
														e.preventDefault();
														deleteFood(user?._id);
													}}
													id='del'
													to='#'>
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
										colSpan='7'
										style={{
											textAlign: "center",
											padding: "30px"
										}}>
										No food items found
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				{/**/}
				<div id='mobileCards'>
					{loading ? (
						<MobileCustomerSkeleton />
					) : foods?.length > 0 ? (
						foods.map((food, index) => (
							<div
								key={food._id}
								id={`mobile-item-${index}`}
								className='mobile-card'>
								<div className='food-item-img'>
									<img
										src={food?.images[0]?.url}
										alt='Food Item'
									/>
								</div>
								<span id='info-tag'>{food?.foodName}</span>
								<span id='info-tag'>Index : {index + 1}</span>
								<span id='info-tag'>ID : {food._id}</span>
								<span id='info-tag'>
									Food Price : {food.price || "N/A"}
								</span>
								<span id='info-tag'>
									Food Category : {food.category || "N/A"}
								</span>
								<span id='info-tag'>
									Created Date :{" "}
									{food.createdAt
										? new Date(food.createdAt)
												.toISOString()
												.split("T")[0]
										: "N/A"}
								</span>
								<div
									id='info-tag'
									style={{
										width: "100%",
										display: "flex",
										justifyContent: "left",
										aliginItems: "center"
									}}>
									<span>Active Status : </span>
									<span
										className={`status ${food?.status || "inactive"}`}>
										{food?.status?.toUpperCase() ||
											"Inactive"}
									</span>
								</div>
								<div className='action-user'>
									<NavLink
										id='view'
										to={`/view-food?foodId=${food?._id}`}>
										<IoEyeOutline size={17} />
										<span>View</span>
									</NavLink>
									<NavLink
										id='edit'
										to={`/edit-food?foodId=${food?._id}`}>
										<FiEdit size={17} />
										<span>Edit</span>
									</NavLink>
									<NavLink
										onClick={(e) => {
											e.preventDefault();
											deleteFood(food?._id);
										}}
										id='del'
										to='#'>
										<AiOutlineDelete size={18} />
										<span>
											{isDeleting
												? "Deleting..."
												: "Delete"}
										</span>
									</NavLink>
								</div>
							</div>
						))
					) : (
						<div className='mobile-card'>
							<h3 style={{ textAlign: "center" }}>
								No food items found!
							</h3>
						</div>
					)}

					{/* PAGINATION */}
					{foods.length !== 0 && (
						<div className='pagination' id='pagination'>
							<div
								className='page-btn'
								onClick={() => {
									if (currentPage > 1) {
										handlePageChange(currentPage - 1);
									}
								}}>
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
									onClick={() => handlePageChange(index + 1)}>
									{index + 1}
								</div>
							))}
							<div
								className='page-btn'
								onClick={() => {
									if (currentPage < totalPages) {
										handlePageChange(currentPage + 1);
									}
								}}>
								Next
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Foods;
