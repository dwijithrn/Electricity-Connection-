import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddConnectionForm.css";

const AddConnectionPage = ({ onAddConnection }) => {
	const navigate = useNavigate();

	const [newConnection, setNewConnection] = useState({
		ID: "",
		name: "",
		gender: "Male",
		district: "",
		state: "",
		pincode: "",
		ownership: "INDIVIDUAL",
		govtIdType: "",
		idNumber: "",
		category: "",
		loadApplied: "",
		dateOfApplication: new Date().toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
		}),
		status: "Pending",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === "dateOfApplication") {
			const [year, month, day] = value.split("-");
			setNewConnection({
				...newConnection,
				[name]: `${day}/${month}/${year.slice(-2)}`,
			});
		} else {
			setNewConnection({ ...newConnection, [name]: value });
		}
	};

	// validating the form
	const validateForm = () => {
		if (
			!newConnection.ID ||
			!newConnection.name ||
			!newConnection.govtIdType ||
			!newConnection.idNumber
		) {
			alert("Please fill in all required fields.");
			return false;
		}
		if (newConnection.loadApplied > 200) {
			alert("Load applied cannot exceed 200 KV.");
			return false;
		}
		return true;
	};

	// handling the form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			onAddConnection(newConnection);
			navigate("/");
		}
	};
	//handle cancel button
	const handleCancel = () => {
		navigate("/");
	};

	return (
		<div className="add-connection-page">
			<h1>Add New Connection</h1>
			<form onSubmit={handleSubmit} className="add-connection-form">
				<label htmlFor="ID">ID:</label>
				<input
					type="text"
					id="ID"
					name="ID"
					value={newConnection.ID}
					onChange={handleInputChange}
					required
				/>

				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					value={newConnection.name}
					onChange={handleInputChange}
					required
				/>

				<label htmlFor="gender">Gender:</label>
				<select
					id="gender"
					name="gender"
					value={newConnection.gender}
					onChange={handleInputChange}
					required
				>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
				</select>

				<label htmlFor="district">District:</label>
				<input
					type="text"
					id="district"
					name="district"
					value={newConnection.district}
					onChange={handleInputChange}
					required
				/>

				<label htmlFor="state">State:</label>
				<input
					type="text"
					id="state"
					name="state"
					value={newConnection.state}
					onChange={handleInputChange}
					required
				/>

				<label htmlFor="pincode">Pincode:</label>
				<input
					type="number"
					id="pincode"
					name="pincode"
					value={newConnection.pincode}
					onChange={handleInputChange}
					required
				/>

				<label htmlFor="ownership">Ownership:</label>
				<select
					id="ownership"
					name="ownership"
					value={newConnection.ownership}
					onChange={handleInputChange}
					required
				>
					<option value="INDIVIDUAL">Individual</option>
					<option value="JOINT">Joint</option>
				</select>

				<label htmlFor="govtIdType">Govt ID Type:</label>
				<select
					id="govtIdType"
					name="govtIdType"
					value={newConnection.govtIdType}
					onChange={handleInputChange}
					required
				>
					<option value="">Select Govt ID Type</option>
					<option value="AADHAR">Aadhar</option>
					<option value="PAN">PAN</option>
					<option value="VOTER_ID">Voter ID</option>
					<option value="PASSPORT">Passport</option>
				</select>

				<label htmlFor="idNumber">ID Number:</label>
				<input
					type="text"
					id="idNumber"
					name="idNumber"
					value={newConnection.idNumber}
					onChange={handleInputChange}
					required
				/>

				<label htmlFor="category">Category:</label>
				<input
					type="text"
					id="category"
					name="category"
					value={newConnection.category}
					onChange={handleInputChange}
					required
				/>

				<label htmlFor="loadApplied">Load Applied (KV):</label>
				<input
					type="number"
					id="loadApplied"
					name="loadApplied"
					value={newConnection.loadApplied}
					onChange={handleInputChange}
					max="200"
					min="0"
					required
				/>

				<label htmlFor="dateOfApplication">
					Date of Application:
				</label>
				<input
					type="date"
					id="dateOfApplication"
					name="dateOfApplication"
					value={newConnection.dateOfApplication
						.split("/")
						.reverse()
						.map((part, index) =>
							index === 0
								? "20" + part
								: part.padStart(2, "0")
						)
						.join("-")} // Convert dd/mm/yy to yyyy-mm-dd for input
					onChange={handleInputChange}
					required
				/>

				<div className="form-submit">
					<button type="submit">Add Connection</button>
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddConnectionPage;
