import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

const ConnectionCharts = ({ connections }) => {
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [barChartData, setBarChartData] = useState(null);
	const [pieChartData, setPieChartData] = useState(null);

	useEffect(() => {
		if (connections && connections.length > 0) {
			updateCharts();
		}
	}, [connections, selectedStatus]);

	const updateCharts = () => {
		try {
			const filteredConnections =
				selectedStatus === "All"
					? connections
					: connections.filter(
							(conn) =>
								conn.status === selectedStatus
					  );

			// Bar chart data
			const monthlyData = getMonthlyData(filteredConnections);
			setBarChartData({
				labels: monthlyData.labels,
				datasets: [
					{
						label: "Number of Connections",
						data: monthlyData.data,
						backgroundColor: "rgba(75, 192, 192, 0.6)",
					},
				],
			});

			// Pie chart data
			const categoryData = getCategoryData(filteredConnections);
			setPieChartData({
				labels: categoryData.labels,
				datasets: [
					{
						data: categoryData.data,
						backgroundColor: [
							"#FF6384",
							"#36A2EB",
							"#FFCE56",
							"#4BC0C0",
						],
					},
				],
			});
		} catch (error) {
			console.error("Error updating charts:", error);
		}
	};

	const getMonthlyData = (connections) => {
		const monthlyCount = {};
		connections.forEach((conn) => {
			if (conn.dateOfApplication) {
				// Parse the date string
				const [day, month, year] =
					conn.dateOfApplication.split("/");
				const date = new Date(
					2000 + parseInt(year),
					parseInt(month) - 1,
					parseInt(day)
				);

				if (!isNaN(date.getTime())) {
					// Check if the date is valid
					const monthYear = `${
						date.getMonth() + 1
					}/${date.getFullYear()}`;
					monthlyCount[monthYear] =
						(monthlyCount[monthYear] || 0) + 1;
				} else {
					console.warn(
						`Invalid date: ${conn.dateOfApplication}`
					);
				}
			}
		});
		return {
			labels: Object.keys(monthlyCount),
			data: Object.values(monthlyCount),
		};
	};

	const getCategoryData = (connections) => {
		const categoryCount = {};
		connections.forEach((conn) => {
			if (conn.category) {
				categoryCount[conn.category] =
					(categoryCount[conn.category] || 0) + 1;
			}
		});
		return {
			labels: Object.keys(categoryCount),
			data: Object.values(categoryCount),
		};
	};

	if (!connections || connections.length === 0) {
		return <div>No connection data available.</div>;
	}

	return (
		<div className="connection-charts">
			<h2>Connection Analytics</h2>
			<div>
				<label htmlFor="status-select">Select Status: </label>
				<select
					id="status-select"
					value={selectedStatus}
					onChange={(e) =>
						setSelectedStatus(e.target.value)
					}
				>
					<option value="All">All</option>
					<option value="Pending">Pending</option>
					<option value="Approved">Approved</option>
					<option value="Rejected">Rejected</option>
					<option value="Connection Released">
						Connection Released
					</option>
				</select>
			</div>
			<div className="charts-container">
				<div className="chart-container bar-chart-container">
					<h3>Monthly Connection Requests</h3>
					{barChartData &&
					barChartData.labels.length > 0 ? (
						<Bar
							data={barChartData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
							}}
							width={400}
							height={300}
						/>
					) : (
						<p>
							No data available for the selected
							status.
						</p>
					)}
				</div>
				<div className="chart-container pie-chart-container">
					<h3>Connection Categories</h3>
					{pieChartData &&
					pieChartData.labels.length > 0 ? (
						<Pie
							data={pieChartData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
							}}
							width={300}
							height={300}
						/>
					) : (
						<p>
							No data available for the selected
							status.
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default ConnectionCharts;
