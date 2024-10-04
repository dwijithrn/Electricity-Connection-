import React, { useState } from "react";
import "../styles/ConnectionDetails.css";

const ConnectionDetails = ({ connection, onSave, onClose }) => {
	// state for edited connection
	const [editedConnection, setEditedConnection] = useState({
		...connection,
	});

	// handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(editedConnection);
	};

	// handle input change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (
			name === "Date_of_Application" ||
			name === "Date_of_Approval" ||
			name === "Modified_Date"
		) {
			const [year, month, day] = value.split("-");
			setEditedConnection({
				...editedConnection,
				[name]: `${day}/${month}/${year.slice(-2)}`,
			});
		} else {
			setEditedConnection({
				...editedConnection,
				[name]: value,
			});
		}
	};

	return (
		// form for editing connection details
		<form onSubmit={handleSubmit} className="connection-details-form">
			<h2>Edit Connection</h2>

			<label htmlFor="ID">ID:</label>
			<input
				type="text"
				id="ID"
				name="ID"
				value={editedConnection.ID}
				onChange={handleInputChange}
				required
				disabled
			/>

			<label htmlFor="Applicant_Name">Name:</label>
			<input
				type="text"
				id="Applicant_Name"
				name="Applicant_Name"
				value={editedConnection.Applicant_Name}
				onChange={handleInputChange}
				required
			/>

			<label htmlFor="gender">Gender:</label>
			<select
				id="gender"
				name="gender"
				value={editedConnection.gender}
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
				value={editedConnection.district}
				onChange={handleInputChange}
				required
			/>

			<label htmlFor="state">State:</label>
			<input
				type="text"
				id="state"
				name="state"
				value={editedConnection.state}
				onChange={handleInputChange}
				required
			/>

			<label htmlFor="pincode">Pincode:</label>
			<input
				type="number"
				id="pincode"
				name="pincode"
				value={editedConnection.pincode}
				onChange={handleInputChange}
				required
			/>

			<label htmlFor="ownership">Ownership:</label>
			<select
				id="ownership"
				name="ownership"
				value={editedConnection.ownership}
				onChange={handleInputChange}
				required
			>
				<option value="INDIVIDUAL">Individual</option>
				<option value="JOINT">Joint</option>
			</select>

			<label htmlFor="GovtID_Type">Govt ID Type:</label>
			<select
				id="GovtID_Type"
				name="GovtID_Type"
				value={editedConnection.GovtID_Type}
				onChange={handleInputChange}
				disabled
			>
				<option value="AADHAR">Aadhar</option>
				<option value="PAN">PAN</option>
				<option value="VOTER_ID">Voter ID</option>
				<option value="PASSPORT">Passport</option>
			</select>

			<label htmlFor="ID_Number">ID Number:</label>
			<input
				type="text"
				id="ID_Number"
				name="ID_Number"
				value={editedConnection.ID_Number}
				onChange={handleInputChange}
				disabled
			/>

			<label htmlFor="category">Category:</label>
			<input
				type="text"
				id="category"
				name="category"
				value={editedConnection.category}
				onChange={handleInputChange}
				required
			/>

			<label htmlFor="loadApplied">Load Applied (KV):</label>
			<input
				type="number"
				id="loadApplied"
				name="loadApplied"
				value={editedConnection.loadApplied}
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
				value={editedConnection.dateOfApplication}
				onChange={handleInputChange}
				disabled
			/>

			<label htmlFor="dateOfApproval">Date of Approval:</label>
			<input
				type="date"
				id="dateOfApproval"
				name="dateOfApproval"
				value={editedConnection.dateOfApproval}
				onChange={handleInputChange}
			/>

			<label htmlFor="modifiedDate">Modified Date:</label>
			<input
				type="date"
				id="modifiedDate"
				name="modifiedDate"
				value={editedConnection.modifiedDate}
				onChange={handleInputChange}
			/>

			<label htmlFor="status">Status:</label>
			<select
				id="status"
				name="status"
				value={editedConnection.status}
				onChange={handleInputChange}
				required
			>
				<option value="Pending">Pending</option>
				<option value="Approved">Approved</option>
				<option value="Rejected">Rejected</option>
				<option value="Connection Released">
					Connection Released
				</option>
			</select>

			<div className="form-actions">
				<button type="submit">Save Changes</button>
				<button type="button" onClick={onClose}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default ConnectionDetails;
