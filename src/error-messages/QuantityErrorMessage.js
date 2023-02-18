import QuantityValidity from "../enums/QuantityValidity";
import GenericErrorMessage from "./GenericErrorMessage";

const getMessage = (validity) => {
	if (validity === QuantityValidity.EMPTY) {
		return "Please enter a quantity.";
	}

	if (validity === QuantityValidity.NAN) {
		return "Please enter a number.";
	}

	if (validity === QuantityValidity.NON_POSITIVE) {
		return "Please enter a positive number.";
	}

	return "";
};

function QuantityErrorMessage({ validity }) {
	return validity === QuantityValidity.VALID ? null : (
		<GenericErrorMessage message={getMessage(validity)} />
	);
}

export default QuantityErrorMessage;
