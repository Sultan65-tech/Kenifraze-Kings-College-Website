import React from "react";

const DeskCustomerSkeleton = () => {
	const len = [1,2,3,4,5,6,7,8,9,10]
	return (
		<>
			{len.map((element, index) => {
				return (
					<tr key={index} class='skeleton-tr'>
						<td>
							<div
								class='skeleton-block'
								style={{width: "130px"}}></div>
						</td>
						<td>
							<div
								class='skeleton-block'
								style={{width: "140px"}}></div>
						</td>
						<td>
							<div
								class='skeleton-block'
								style={{width: "90px"}}></div>
						</td>
						<td>
							<div
								class='skeleton-block'
								style={{width: "40px"}}></div>
						</td>
						<td>
							<div
								class='skeleton-block'
								style={{width: "100px"}}></div>
						</td>
						<td>
							<div
								class='skeleton-block skeleton-badge'
								style={{width: "75px"}}></div>
						</td>
						<td>
							<div
								class='skeleton-block skeleton-btn'
								style={{width: "60px"}}></div>
						</td>
					</tr>
				);
			})}
		</>
	);
};

export default DeskCustomerSkeleton;
