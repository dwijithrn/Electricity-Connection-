import React, { useState } from "react";

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchTerm);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search by ID or Name..."
			/>
			<button type="submit">Search</button>
		</form>
	);
};

export default SearchBar;
