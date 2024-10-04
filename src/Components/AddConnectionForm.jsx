import React, { useState } from "react";
import "../styles/AddConnectionForm.css";

const AddConnectionForm = ({ onAddConnection, onCancel }) => {
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
		}), // This will give dd/mm/yy format
		status: "Pending",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === "dateOfApplication") {
			// converting the date to dd/mm/yy format
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
			onCancel();
		}
	};

	return (
		// form for adding a new connection
		<form
			onSubmit={handleSubmit}
			className="add-connection-form"
		></form>
	);
};

export default AddConnectionForm;
