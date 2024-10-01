import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { db } from "./firebase";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import ConnectionList from "./Components/ConnectionList";
import ConnectionDetails from "./components/ConnectionDetails";
import DateRangeFilter from "./Components/DateRangeFilter";
import Modal from "./Components/Modal";
import VisualizationScreen from "./Components/VisualizationScreen";
import AddConnectionPage from "./Components/AddConnectionPage";
import "./App.css";
import "./styles/components.css";

function App() {
	const [user, setUser] = useState({ name: "User" });
	const [connections, setConnections] = useState([]);
	const [filteredConnections, setFilteredConnections] = useState([]);
	const [selectedConnection, setSelectedConnection] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fetchConnections = async () => {
			try {
				const querySnapshot = await getDocs(
					collection(db, "connections")
				);
				const fetchedConnections = querySnapshot.docs.map(
					(doc) => ({
						id: doc.id,
						...doc.data(),
					})
				);
				setConnections(fetchedConnections);
				setFilteredConnections(fetchedConnections);
			} catch (error) {
				console.error("Error fetching connections:", error);
			}
		};
		fetchConnections();
	}, []);

	const handleAddConnection = async (newConnection) => {
		try {
			const docRef = await addDoc(collection(db, "connections"), {
				ID: newConnection.ID,
				Applicant_Name: newConnection.name,
				Gender: newConnection.gender,
				District: newConnection.district,
				State: newConnection.state,
				Pincode: newConnection.pincode,
				Ownership: newConnection.ownership,
				GovtID_Type: newConnection.govtIdType,
				ID_Number: newConnection.idNumber,
				Category: newConnection.category,
				Load_Applied: newConnection.loadApplied,
				Date_of_Application: newConnection.dateOfApplication,
				Date_of_Approval: "",
				Modified_Date: new Date().toLocaleDateString("en-GB"),
				Status: "Pending",
				Reviewer_ID: "",
				Reviewer_Name: "",
				Reviewer_Comments: "",
			});
			const connectionWithId = { ...newConnection, id: docRef.id };
			setConnections([...connections, connectionWithId]);
			setFilteredConnections([
				...filteredConnections,
				connectionWithId,
			]);
		} catch (error) {
			console.error("Error adding connection:", error);
		}
	};

	const handleEditConnection = (connection) => {
		setSelectedConnection({
			...connection,
			ID: connection.ID,
			Applicant_Name: connection.Applicant_Name,
			GovtID_Type: connection.GovtID_Type,
			ID_Number: connection.ID_Number,
			// ... other fields ...
		});
		setIsModalOpen(true);
	};

	const handleSaveConnection = async (editedConnection) => {
		try {
			await updateDoc(
				doc(db, "connections", editedConnection.id),
				editedConnection
			);
			const updatedConnections = connections.map((conn) =>
				conn.id === editedConnection.id
					? editedConnection
					: conn
			);
			setConnections(updatedConnections);
			setFilteredConnections(updatedConnections);
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error updating connection:", error);
		}
	};

	const handleDeleteConnection = async (id) => {
		try {
			await deleteDoc(doc(db, "connections", id));
			const updatedConnections = connections.filter(
				(connection) => connection.id !== id
			);
			setConnections(updatedConnections);
			setFilteredConnections(updatedConnections);
		} catch (error) {
			console.error("Error deleting connection:", error);
		}
	};

	const handleSearch = (searchTerm) => {
		const filtered = connections.filter((connection) => {
			if (!connection) return false;

			const idMatch = connection.ID
				? connection.ID.toString()
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				: false;

			const nameMatch = connection.Applicant_Name
				? connection.Applicant_Name.toLowerCase().includes(
						searchTerm.toLowerCase()
				  )
				: false;

			return idMatch || nameMatch;
		});
		setFilteredConnections(filtered);
	};

	const handleDateFilter = (startDate, endDate) => {
		const filtered = connections.filter((connection) => {
			const applicationDate = new Date(
				connection.Date_of_Application
			);
			return (
				applicationDate >= new Date(startDate) &&
				applicationDate <= new Date(endDate)
			);
		});
		setFilteredConnections(filtered);
	};

	const handleReset = () => {
		setFilteredConnections(connections);
		setSearchTerm("");
		setStartDate("");
		setEndDate("");
	};

	return (
		<Router>
			<div className="app-container">
				<Header user={user} />
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/add-connection">
								Add Connection
							</Link>
						</li>
						<li>
							<Link to="/visualization">
								Data Visualization
							</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route
						path="/"
						element={
							<main>
								<section className="connection-management">
									<h2>
										Connection
										Management
									</h2>
									<hr />
									<div
										style={{
											display: "flex",
											justifyContent:
												"space-evenly",
											gap: "10rem",
										}}
									>
										<SearchBar
											onSearch={
												handleSearch
											}
											searchTerm={
												searchTerm
											}
											setSearchTerm={
												setSearchTerm
											}
										/>
										<DateRangeFilter
											onFilter={
												handleDateFilter
											}
											startDate={
												startDate
											}
											setStartDate={
												setStartDate
											}
											endDate={
												endDate
											}
											setEndDate={
												setEndDate
											}
										/>
									</div>
									<button
										onClick={
											handleReset
										}
									>
										Reset Filters
									</button>
									<hr />

									<ConnectionList
										connections={
											filteredConnections
										}
										onEditConnection={
											handleEditConnection
										}
										onDeleteConnection={
											handleDeleteConnection
										}
									/>
									<Modal
										isOpen={isModalOpen}
										onClose={() =>
											setIsModalOpen(
												false
											)
										}
									>
										{selectedConnection && (
											<ConnectionDetails
												connection={
													selectedConnection
												}
												onSave={
													handleSaveConnection
												}
												onClose={() =>
													setIsModalOpen(
														false
													)
												}
											/>
										)}
									</Modal>
								</section>
							</main>
						}
					/>
					<Route
						path="/add-connection"
						element={
							<AddConnectionPage
								onAddConnection={
									handleAddConnection
								}
							/>
						}
					/>
					<Route
						path="/visualization"
						element={
							<VisualizationScreen
								connections={connections}
							/>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
