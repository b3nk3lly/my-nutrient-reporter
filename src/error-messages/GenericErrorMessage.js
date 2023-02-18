import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function GenericErrorMessage({ message }) {
	return (
		<div style={{ color: "red" }}>
			<ErrorOutlineIcon /> {message}
		</div>
	);
}

export default GenericErrorMessage;
