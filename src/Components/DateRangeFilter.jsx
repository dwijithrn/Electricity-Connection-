import React, { useState } from "react";

const DateRangeFilter = ({
	onFilter,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
}) => {
	const handleFilter = () => {
		onFilter(startDate, endDate);
	};

	return (
		<div className="date-range-filter">
			<input
				type="date"
				value={startDate}
				onChange={(e) => setStartDate(e.target.value)}
			/>
			<input
				type="date"
				value={endDate}
				onChange={(e) => setEndDate(e.target.value)}
			/>
			<button type="submit" onClick={handleFilter}>
				Filter
			</button>
		</div>
	);
};

export default DateRangeFilter;
