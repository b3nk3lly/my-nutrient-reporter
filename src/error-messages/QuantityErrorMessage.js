import QuantityValidity from "../enums/QuantityValidity";
import GenericErrorMessage from "./GenericErrorMessage";

const getMessage = (validity) => {
	switch (validity) {
		case QuantityValidity.EMPTY:
			return "Please enter a quantity.";
		case QuantityValidity.NAN:
			return "Please enter a number.";
		case QuantityValidity.NON_POSITIVE:
			return "Please enter a positive number.";
		default:
			return "";
	}
};

function QuantityErrorMessage({ validity }) {
	return validity === QuantityValidity.VALID ? null : (
		<GenericErrorMessage message={getMessage(validity)} />
	);
}

export default QuantityErrorMessage;
