import ServingUnit from "./ServingUnit";
import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Card, CardContent, IconButton, TextField } from "@mui/material";
import ReducerActions from "../enums/ReducerActions";
import { useState } from "react";
import QuantityValidity from "../enums/QuantityValidity";
import QuantityErrorMessage from "../error-messages/QuantityErrorMessage";

function FoodCard({ meal, food, dispatch }) {
	const [quantity, setQuantity] = useState();
	const [validity, setValidity] = useState(QuantityValidity.VALID);

	// Remove the food item when the Remove button is clicked
	const removeFood = () => {
		console.log("Removing food code " + food.foodCode);

		dispatch({
			type: ReducerActions.REMOVE_FOOD,
			payload: { meal: meal, foodCode: food.foodCode }
		});
	};

	const handleQuantityChange = (event) => {
		let _quantity = event.target.value;
		console.log("Setting quantity to " + _quantity);

		if (!_quantity) {
			setValidity(QuantityValidity.EMPTY);
		} else if (isNaN(_quantity)) {
			setValidity(QuantityValidity.NAN);
		} else if (_quantity <= 0) {
			setValidity(QuantityValidity.NON_POSITIVE);
		} else {
			setValidity(QuantityValidity.VALID);
		}

		setQuantity(_quantity);
	};

	// Set quantity based on the textbox
	const dispatchQuantity = () => {
		console.log("Dispatching quantity " + quantity);

		dispatch({
			type: ReducerActions.UPDATE_QUANTITY,
			payload: { meal: meal, food: food, quantity: quantity }
		});
	};

	return (
		<Card variant="outlined">
			<CardContent>
				<Grid container rowSpacing={1}>
					{/* Top row */}
					<Grid item xs={11}>
						{food.description}
						<br />
						{"Food code: " + food.foodCode}
					</Grid>
					<Grid item xs={1}>
						<IconButton onClick={removeFood}>
							<DeleteOutlineIcon />
						</IconButton>
					</Grid>

					{/* Bottom row */}
					<QuantityErrorMessage validity={validity} />
					<Grid item xs={12}>
						<TextField
							placeholder="Enter quantity"
							size="small"
							onChange={handleQuantityChange}
							onBlur={dispatchQuantity}
						/>
						<ServingUnit
							meal={meal}
							food={food}
							dispatch={dispatch}
						/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

export default FoodCard;
