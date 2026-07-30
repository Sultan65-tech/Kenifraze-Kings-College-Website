import React, { useState, useEffect } from "react";
import useDashboard from "../store/useDashboard";

const DashboardCard = () => {
	const {
		stats,
		getDashboard,
		isLoading,
		DIRECT_CONSULTATION,
		FEATURE_PLAN,
		PROMOTION_ON_SITE,
		campaign
	} = useDashboard();
	useEffect(() => {
		getDashboard();
	}, []);
	
		const [greeting,setGreeting] = useState("Good Morning")
				// const day = new Date().getHours()
				// if (day >= 0 || day < 12) {
				// 	setGreeting("Good Morning")
				// }else if(day >= 12 || day <= 4){
				// 	setGreeting("Good Afternoon")
				// }else if(day > 4 || day < 10){
				// 	setGreeting("Good Night")
				// }
			
	return (
		<>
			<style>{`
				:root{
					--primary: #4f46e5;
					--bg: #f8fafc;
					--text: #0f172a;
					--border: #e2e8f0;
				}

				.dashboard-wrapper{
					width: 100%;
				}

				.page-header{
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 20px;
					flex-wrap: wrap;
					margin-bottom: 30px;
				}

				.page-title{
					font-size: 22px;
					font-weight: 700;
					color: var(--text);
					margin: 0;
				}

				.live-box{
					background: #fff;
					padding: 10px 18px;
					border-radius: 50px;
					box-shadow: 0 4px 15px rgba(0,0,0,0.08);
					font-weight: 500;
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.live-dot{
					color: #22c55e;
					font-size: 14px;
				}

				.stats-grid{
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
					gap: 22px;
					margin-bottom: 30px;
				}

				.stat-card{
					background: white;
					padding: 24px;
					border-radius: 22px;
					box-shadow: 0 10px 25px rgba(0,0,0,0.06);
					transition: 0.3s ease;
					border: 1px solid rgba(226,232,240,0.7);
				}

				.stat-card:hover{
					transform: translateY(-5px);
				}

				.stat-header{
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #64748b;
					font-size: 15px;
					margin-bottom: 14px;
				}

				.stat-value{
					font-size: 22px;
					font-weight: 700;
					color: var(--text);
					margin-bottom: 10px;
				}

				.stat-subtitle{
					font-size: 14px;
					font-weight: 500;
				}

				.dashboard-grid{
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
					gap: 25px;
				}

				.card{
					background: white;
					padding: 24px;
					border-radius: 24px;
					box-shadow: 0 10px 25px rgba(0,0,0,0.06);
					border: 1px solid rgba(226,232,240,0.7);
				}

				.card-title{
					font-size: 22px;
					font-weight: 700;
					margin-bottom: 22px;
					color: var(--text);
				}

				.orders-list{
					display: flex;
					flex-direction: column;
					gap: 18px;
				}

				.order-item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-bottom: 14px;
					border-bottom: 1px solid var(--border);
					gap: 15px;
				}

				.order-item:last-child{
					border-bottom: none;
					padding-bottom: 0;
				}

				.order-id{
					font-weight: 700;
					color: var(--text);
				}

				.order-name{
					font-size: 14px;
					color: #64748b;
					margin-top: 4px;
				}

				.order-right{
					text-align: right;
				}

				.order-price{
					font-weight: 700;
					color: var(--primary);
					margin-bottom: 6px;
				}

				.status{
					background: #22c55e;
					color: white;
					padding: 5px 12px;
					border-radius: 30px;
					font-size: 12px;
					font-weight: 600;
					display: inline-block;
				}

				.trending-list{
					display: flex;
					flex-direction: column;
					gap: 18px;
				}

				.trending-item{
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.trending-badge{
					background: #eff6ff;
					color: var(--primary);
					padding: 6px 14px;
					border-radius: 20px;
					font-weight: 700;
					min-width: 60px;
					text-align: center;
				}

				@media (max-width: 768px){
					.page-header{
						flex-direction: column;
						align-items: flex-start;
					}

					.dashboard-grid{
						grid-template-columns: 1fr;
					}
				}
			`}</style>
			
			{isLoading ? (
				<h3 style={{ textAligin: "center" }}>Loading...</h3>
			) : (
				<div className="dashboard-wrapper">
					<div className="page-header">
						<h1 className="page-title">{greeting}, Admin 👋</h1>
						<div className="live-box">
							<span className="live-dot">●</span>
							Live Now
						</div>
					</div>

					{/* Stats */}
					<div className="stats-grid">
						{stats?.map((item, index) => (
							<div className="stat-card" key={index}>
								<div className="stat-header">
									<div>{item.title}</div>
									<span style={{ fontSize: "28px" }}>
										{item.icon}
									</span>
								</div>

								<div className="stat-value">{item.value}</div>

								<div
									className="stat-subtitle"
									style={{ color: item.color }}
								>
									{item.subtitle}
								</div>
							</div>
						))}
					</div>

					<div className="dashboard-grid">
						{/* Recent Orders */}
						<div className="card">
							<h3 className="card-title">Recent Promotion Orders</h3>

							<div className="orders-list">
								{campaign?.length > 0 &&
									campaign?.map((item, index) => {
										return (
											<div
												key={index}
												className="order-item"
											>
												<div>
													<div className="order-id">
														{item?.payment_intent}
													</div>
													<div className="order-name">
														{item?.name} •{" "}
														{item?.email}
													</div>
												</div>
												<div className="order-right">
													<div className="order-price">
														{"$"+item?.price + ".00"}
													</div>
													<span
														className={
															item?.status ===
															"PAID"
																? "status accepted"
																: "status unpaid"
														}
													>
														{item?.status ===
														"PAID"
															? "Delivered"
															: "Pending"}
													</span>
												</div>
											</div>
										);
									})}
							</div>
						</div>

						{/* Trending */}
						<div className="card">
							<h3 className="card-title">Trending This Week</h3>
							<div className="trending-list">
								<div className="trending-item">
									<div>Promotion On Site</div>
									<div className="trending-badge">
										{PROMOTION_ON_SITE}
									</div>
								</div>
								<div className="trending-item">
									<div>Direct Consultations</div>
									<div className="trending-badge">
										{DIRECT_CONSULTATION}
									</div>
								</div>
								<div className="trending-item">
									<div>3 Month Feature Plans</div>
									<div className="trending-badge">
										{FEATURE_PLAN}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default DashboardCard;
