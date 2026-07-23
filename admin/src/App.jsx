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
	useEffect(() => {
		checkAuth();
		if (!isAdmin) {
			<Navigate to="/admin-login" replace />;
		}
	}, [admin, isAdmin, checkAuth]);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<IsAdmin>
							<Layout />
						</IsAdmin>
					}
				>
					<Route
						index
						path=""
						element={
							<IsAdmin>
								<Dashboard />
							</IsAdmin>
						}
					/>
					<Route
						path="users"
						element={
							<IsAdmin>
								<Customer />
							</IsAdmin>
						}
					/>
					<Route
						path="promotions"
						element={
							<IsAdmin>
								<Promotion />
							</IsAdmin>
						}
					/>
					<Route
						path="add-artist"
						element={
							<IsAdmin>
								<AddArtist />
							</IsAdmin>
						}
					/>
					<Route
						path="artists"
						element={
							<IsAdmin>
								<ArtistPage />
							</IsAdmin>
						}
					/>
					<Route
						path="edit-artist"
						element={
							<IsAdmin>
								<EditArtist />
							</IsAdmin>
						}
					/>
					<Route
						path="edit-hero"
						element={
							<IsAdmin>
								<AddHero />
							</IsAdmin>
						}
					/>
					<Route
						path="edit-contact"
						element={
							<IsAdmin>
								<AddContact />
							</IsAdmin>
						}
					/>
					<Route
						path="edit-logo"
						element={
							<IsAdmin>
								<AddLogo />
							</IsAdmin>
						}
					/>
					<Route
						path="food-items"
						element={
							<IsAdmin>
								<Foods />
							</IsAdmin>
						}
					/>
				</Route>
				<Route
					path="/admin-login"
					element={
						admin && isAdmin ? (
							<Navigate to="/" replace />
						) : (
							<Login />
						)
					}
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
