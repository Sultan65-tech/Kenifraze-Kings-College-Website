import React from "react";

const MobileCustomerSkeleton = () => {
	const len = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<>
			{len.map((element, index) => {
				return (
					<div key={index} class='mobile-card'>
						<div
							class='skeleton-block'
							style={{
								width: "50%",
								marginBottom: "10px",
								height: "18px"
							}}></div>
						<br />
						<div
							class='skeleton-block'
							style={{
								width: "75%",
								marginBottom: "15px"
							}}></div>
						<br />
						<div
							class='skeleton-block'
							style={{
								width: "40%",
								marginBottom: "12px"
							}}></div>
						<br />
						<div
							class='skeleton-block skeleton-badge'
							style={{
								width: "70px",
								display: "block",
								marginBottom: "12px"
							}}></div>
						<div
							class='skeleton-block skeleton-btn'
							style={{ width: "100%" }}></div>
					</div>
				);
			})}
		</>
	);
};

export default MobileCustomerSkeleton;
