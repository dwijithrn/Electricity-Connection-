import React from "react";

const Header = ({ user }) => (
	<header>
		<h1>Electricity Connection Dashboard</h1>
		<p>Welcome, {user.name}</p>
	</header>
);

export default Header;
