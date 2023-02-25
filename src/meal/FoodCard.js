import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import ReducerActions from "../enums/ReducerActions";
import QuantityInput from "./QuantityInput";

function FoodCard({ meal, food, dispatch }) {
	// Remove the food item when the Remove button is clicked
	const removeFood = () => {
		console.log("Removing food code " + food.foodCode);

		dispatch({
			type: ReducerActions.REMOVE_FOOD,
			payload: { meal: meal, foodCode: food.foodCode }
		});
	};

	return (
		<Card variant="outlined" sx={{ borderRadius: 5 }}>
			<CardContent>
				<Grid container rowSpacing={1}>
					{/* Top row */}
					<Grid item xs={11}>
						<Typography>{food.description}</Typography>
						<Typography variant="caption">
							{"Food code: " + food.foodCode}
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<IconButton onClick={removeFood}>
							<DeleteOutlineIcon />
						</IconButton>
					</Grid>

					{/* Bottom row */}
					<Grid item xs={12}>
						<QuantityInput
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
