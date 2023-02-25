import { useState } from "react";
import MealCard from "./MealCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Container, Grid, IconButton } from "@mui/material";
import ReducerActions from "../enums/ReducerActions";

function MealController({ meals, dispatch, foodOptions }) {
	const [nextMealKey, setNextMealKey] = useState(1);

	const addMeal = () => {
		dispatch({
			type: ReducerActions.ADD_MEAL,
			payload: { id: nextMealKey, name: "Untitled Meal" }
		});
		setNextMealKey(nextMealKey + 1);
	};

	return (
		<Container>
			<Grid container rowSpacing={1}>
				<h2>Meals</h2>
			</Grid>
			<Grid
				container
				rowSpacing={2}
				alignItems="center"
				justifyContent="center"
			>
				{meals.map((meal) => {
					return (
						<Grid item xs={12} key={meal.id}>
							<MealCard
								meal={meal}
								dispatch={dispatch}
								isOnlyMeal={meals.length === 1}
							/>
						</Grid>
					);
				})}
				<Grid item>
					<IconButton
						onClick={addMeal}
						sx={{ transform: "scale(1.2)" }}
					>
						<AddCircleOutlineIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Container>
	);
}

export default MealController;
