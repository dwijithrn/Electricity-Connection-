import React from "react";
import ConnectionCharts from "./ConnectionCharts";

const VisualizationScreen = ({ connections }) => {
	return (
		<div className="visualization-screen">
			<h1>Data Visualization</h1>
			<ConnectionCharts connections={connections} />
		</div>
	);
};

export default VisualizationScreen;
