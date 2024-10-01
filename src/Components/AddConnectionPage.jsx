import React from "react";
import AddConnectionForm from "./AddConnectionForm";
import { useNavigate } from "react-router-dom";

const AddConnectionPage = ({ onAddConnection }) => {
	const navigate = useNavigate();

	const handleAddConnection = (newConnection) => {
		onAddConnection(newConnection);
		navigate("/");
	};

	return (
		<div className="add-connection-page">
			<h1>Add New Connection</h1>
			<AddConnectionForm
				onAddConnection={handleAddConnection}
				onClose={() => navigate("/")}
			/>
		</div>
	);
};

export default AddConnectionPage;
