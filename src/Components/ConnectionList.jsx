import React, { useState } from "react";

const ConnectionList = ({
	connections,
	onEditConnection,
	onDeleteConnection,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [connectionsPerPage] = useState(15);

	// Get current connections
	const indexOfLastConnection = currentPage * connectionsPerPage;
	const indexOfFirstConnection = indexOfLastConnection - connectionsPerPage;
	const currentConnections = connections.slice(
		indexOfFirstConnection,
		indexOfLastConnection
	);

	// Change page
	const nextPage = () => {
		if (
			currentPage <
			Math.ceil(connections.length / connectionsPerPage)
		) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div>
			<table className="connection-list">
				<thead>
					<tr>
						<th>Applicant ID</th>
						<th>Name</th>
						<th>Date of Application</th>
						<th>Category</th>
						<th>Load Applied</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{currentConnections.map((connection) => (
						<tr key={connection.id}>
							<td>{connection.ID}</td>
							<td>{connection.Applicant_Name}</td>
							<td>
								{connection.Date_of_Application}
							</td>
							<td>{connection.Category}</td>
							<td>{connection.Load_Applied} KV</td>
							<td>{connection.Status}</td>
							<td>
								<button
									onClick={() =>
										onEditConnection(
											connection
										)
									}
								>
									Edit
								</button>
								{connection.status ===
									"Rejected" && (
									<button
										onClick={() =>
											onDeleteConnection(
												connection.id
											)
										}
									>
										Delete
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="pagination">
				<button onClick={prevPage} disabled={currentPage === 1}>
					Previous
				</button>
				<span>
					Page {currentPage} of{" "}
					{Math.ceil(
						connections.length / connectionsPerPage
					)}
				</span>
				<button
					onClick={nextPage}
					disabled={
						currentPage ===
						Math.ceil(
							connections.length /
								connectionsPerPage
						)
					}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default ConnectionList;
