import React from "react";
import { NavLink } from "react-router-dom";
import api from "../libs/api";
import usePromotion from "../store/usePromotion";

const PopupWindow = ({ customer, setService }) => {
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

	return (
		<section className="popup-window">
			<div id={`mobile-item-`} className="mobile-card">
				<button onClick={() => setService(null)} id="close-window">
					X
				</button>
				<span className="service-type" id="info-tag">
					Service Type : {customer?.promotion_type || "N/A"}
				</span>
				{customer?.promotion_type === "PROMOTION ON SITE" && (
					<>
						<img
							src={api + "/" + customer?.albumAvatar}
							alt="Album Cover Image"
						/>
						<br />
						<audio controls>
							<source src={api + "/" + customer?.musicSrc} />
							Your browser does not support the audio element.
						</audio>
					</>
				)}
				{customer?.promotion_type === "SITE_SERVICE_PACKAGE" && (
					<>
						<span id="info-tag">
							Stream URL : {customer.stream_url}
						</span>
						<span id="info-tag">
							Service Duration : {customer.duration}
						</span>
					</>
				)}
				<span id="info-tag">Artist Name : {customer.name}</span>
				{customer?.song_title && (
					<span id="info-tag">
						Song Title : {customer.song_title}
					</span>
				)}
				<span id="info-tag">
					Artist UID :{" "}
					{customer?.userId.slice(0, 12) + "..." || index + 1}
				</span>
				<span id="info-tag">
					Service ID :{" "}
					{customer?._id.slice(0, 12) + "..." || index + 1}
				</span>
				<span id="info-tag">
					PID : {customer?.paymentInfo?.payment_intent || "N/A"}
				</span>
				<span id="info-tag">Phone Number : {customer.phone}</span>
				<span id="info-tag">Email Address : {customer.email}</span>
				<span id="info-tag">
					Order Date :{" "}
					{customer.createdAt
						? new Date(customer.createdAt)
								.toISOString()
								.split("T")[0]
						: "N/A"}
				</span>
				{customer?.promotion_type === "DIRECT CONSULTATION" && (
					<>
						<br />
						<hr />
						<span id="info-tag">
							Consultation Hours : {customer?.hour || "N/A"}
						</span>
						<span id="info-tag">
							Consultation Date : {customer?.date || "N/A"}
						</span>
						<span id="info-tag">
							Consultation Time :{" "}
							{customer?.time +
								" - " +
								addHoursToTime(
									customer?.time,
									customer?.hour
								) || "N/A"}
						</span>
					</>
				)}
				<span id="info-tag">
					Service Price : {customer?.price + ".00$" || "N/A"}
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
						{customer.status?.toUpperCase() || "UNPAID"}
					</span>
				</div>
				<div className="action-user">
					<NavLink
						id="edit"
						className={customer?.is_Accept || ""}
						to="#"
						onClick={e => {
							e.preventDefault();
							acceptPromotion(customer?._id);
							setService(null);
						}}
					>
						<span>{customer?.is_Accept || "Accept"}</span>
					</NavLink>
					{/*<span>Action</span>*/}
					<NavLink
						onClick={e => {
							e.preventDefault();
							deleteCustomer(customer?._id);
							setService(null);
						}}
						id="del"
						to="#"
					>
						<span>{isDeleting ? "Deleting..." : "Delete"}</span>
					</NavLink>
				</div>
			</div>
		</section>
	);
};

export default PopupWindow;
