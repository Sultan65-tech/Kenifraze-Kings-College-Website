import React from "react";
import "../styles/customer.style.css";

const Customer = () => {
	document.title = "Customers/Users Management - GramBhoj Admin Dashboard";
	const customers = [
		{
			id: 1,
			name: "Rahim Khan",
			phone: "+880 1711-234567",
			location: "Sylhet",
			orders: 24,
			joinDate: "2025-01-15",
			status: "active"
		},
		{
			id: 2,
			name: "Priya Das",
			phone: "+880 1812-987654",
			location: "Dhaka",
			orders: 18,
			joinDate: "2025-02-03",
			status: "active"
		},
		{
			id: 3,
			name: "Arjun Roy",
			phone: "+880 1913-456789",
			location: "Chittagong",
			orders: 9,
			joinDate: "2024-12-20",
			status: "inactive"
		},
		{
			id: 4,
			name: "Nadia Ahmed",
			phone: "+880 1614-112233",
			location: "Sylhet",
			orders: 32,
			joinDate: "2025-03-10",
			status: "active"
		},
		{
			id: 5,
			name: "Sabbir Hossain",
			phone: "+880 1515-998877",
			location: "Dhaka",
			orders: 15,
			joinDate: "2025-01-28",
			status: "active"
		}
	];

	return (
		<div className='main-content'>
			<div className='container'>
				<div className='page-header'>
					<h1 className='page-title'>All Customers (1,284)</h1>
				</div>
				<div className='controls'>
					<div className='search-box'>
						<span>🔍</span>
						<input
							type='text'
							id='searchInput'
							placeholder='Search by name, phone or email...'
						/>
					</div>
					<select id='statusFilter'>
						<option value=''>All Status</option>
						<option value='active'>Active</option>
						<option value='inactive'>Inactive</option>
					</select>
					<select id='sortBy'>
						<option value='name'>Sort by Name</option>
						<option value='orders'>Sort by Orders</option>
						<option value='date'>Sort by Join Date</option>
					</select>
					<button
						style={{
							background: "var(--primary)",
							color: "white",
							border: "none",
							padding: "10px 20px",
							borderRadius: "12px",
							cursor: "pointer"
						}}>
						Export CSV
					</button>
				</div>
				{/*---> Desktop Tables <----*/}
				<div className='table-container'>
					<table id='customersTable'>
						<thead>
							<tr>
								<th>Customer</th>
								<th>Phone</th>
								<th>Location</th>
								<th>Total Orders</th>
								<th>Join Date</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody id='tableBody'>
							{customers.map((user, index) => {
								return (
									<tr>
										<td>
											<strong class='customer-name'>
												{user.name}
											</strong>
										</td>
										<td>{user.phone}</td>
										<td>{user.location}</td>
										<td>
											<strong>{user.orders}</strong>
										</td>
										<td>{user.joinDate}</td>
										<td>
											<span
												class={`status ${user.status}`}>
												{user.status.toUpperCase()}
											</span>
										</td>
										<td>
											<button
												style={{
													background: "#0d6efd",
													color: "white",
													border: "none",
													padding: "6px 12px",
													borderRadius: "8px",
													cursor: "pointer"
												}}>
												View
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{/*<!-- Mobile Cards -->*/}
				<div id='mobileCards'>
					{customers.map((customer, index) => {
						return (
							<div className='mobile-card'>
								<strong>{customer.name}</strong>
								<br />
								<small>
									{customer.phone} • {customer.location}
								</small>
								<br />
								<br />
								Orders: <strong>{customer.orders}</strong> |
								Joined: {customer.joinDate}
								<br />
								<span className={`status ${customer.status}`}>
									{customer.status.toUpperCase()}
								</span>
								<button
									style={{
										marginTop: "12px",
										width: "100%",
										padding: "10px",
										background: "var(--primary)",
										color: "white",
										border: "none",
										borderRadius: "10px"
									}}>
									View Details
								</button>
							</div>
						);
					})}
					<div class="pagination" id="pagination">
					<div class="page-btn active">1</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Customer;
