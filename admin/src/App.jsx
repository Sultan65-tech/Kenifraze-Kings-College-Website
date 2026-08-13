import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from "react-router-dom";
import useAuth from "./store/useAuth";
import IsAdmin from "./middlewares/IsAdmin";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import SetNewPassword from "./pages/SetNewPassword";
import Layout from "./layouts";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import AddContact from "./pages/AddContact";
import AddHero from "./pages/AddHero";
import Foods from "./pages/Foods";
import AddLogo from "./pages/AddLogo";
import Promotion from "./pages/Promotion";
import AddArtist from "./pages/AddArtist";
import ArtistPage from "./pages/ArtistPage";
import EditArtist from "./pages/EditArtist";

const App = () => {
	 const { admin, checkAuth, isAdmin } = useAuth();
	// useEffect(() => {
	// 	checkAuth();
	// 	if (!isAdmin) {
	// 		<Navigate to="/admin-login" replace />;
	// 	}
	// }, [admin, isAdmin, checkAuth]);

	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={
						
							<Login/>

					}
				></Route>
				<Route
					path="/"
					element={
						
							<Layout />

					}
				>
					<Route
						index
						path=""
						element={
								<Dashboard />
						}
					/>
					<Route
						path="users"
						element={
								<Customer />
						}
					/>
					<Route
						path="promotions"
						element={
								<Promotion />
						}
					/>
					<Route
						path="add-teacher"
						element={
								<AddArtist />
						}
					/>
					<Route
						path="artists"
						element={
								<ArtistPage />
						}
					/>
					<Route
						path="edit-artist"
						element={
								<EditArtist />
						}
					/>
					<Route
						path="edit-hero"
						element={
								<AddHero />
						}
					/>
					<Route
						path="edit-contact"
						element={
								<AddContact />
						}
					/>
					<Route
						path="edit-logo"
						element={
								<AddLogo />
						}
					/>
					<Route
						path="food-items"
						element={
								<Foods />
						}
					/>
				</Route>
				<Route
					path="/"
					element={<Dashboard/>}
				/>
				<Route
					path="/reset-password"
					element={
						admin && isAdmin ? (
							<Navigate to="/" replace />
						) : (
							<ResetPassword />
						)
					}
				/>
				<Route
					path="/set-new-password"
					element={
						admin && isAdmin ? (
							<Navigate to="/" replace />
						) : (
							<SetNewPassword />
						)
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
