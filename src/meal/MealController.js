import { useState } from "react";
import MealCard from "./MealCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Container, Grid, IconButton } from "@mui/material";
import REDUCER_ACTIONS from "../ReducerActions";

function MealController({ meals, dispatch }) {
	const [nextMealKey, setNextMealKey] = useState(1);

	const addMeal = () => {
		dispatch({
			type: REDUCER_ACTIONS.ADD_MEAL,
			payload: { id: nextMealKey }
		});
		setNextMealKey(nextMealKey + 1);
	};

	return (
		<Container>
			Meals
			<IconButton onClick={addMeal}>
				<AddCircleOutlineIcon />
			</IconButton>
			<Grid container rowSpacing={2}>
				{meals.map((meal) => {
					return (
						/* One row per Meal, with each Meal taking up half the space */
						<Grid item xs={12} key={meal.id}>
							<Grid item xs={12}>
								<MealCard meal={meal} dispatch={dispatch} />
							</Grid>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
}

export default MealController;
