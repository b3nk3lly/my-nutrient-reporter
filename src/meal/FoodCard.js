import ServingUnit from "./ServingUnit";
import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Card, CardContent, IconButton, TextField } from "@mui/material";
import REDUCER_ACTIONS from "../ReducerActions";

function FoodCard({ meal, food, dispatch }) {
	// Remove the food item when the Remove button is clicked
	const removeFood = () => {
		console.log("Removing food code " + food.foodCode);

		dispatch({
			type: REDUCER_ACTIONS.REMOVE_FOOD,
			payload: { meal: meal, foodCode: food.foodCode }
		});
	};

	// Set quantity based on the textbox
	const handleQuantityChange = (event) => {
		console.log("Setting quantity to " + event.target.value);
		dispatch({
			type: REDUCER_ACTIONS.UPDATE_QUANTITY,
			payload: { meal: meal, food: food, quantity: event.target.value }
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
					<Grid item xs={12}>
						<TextField
							placeholder="Enter quantity"
							size="small"
							onBlur={handleQuantityChange}
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
