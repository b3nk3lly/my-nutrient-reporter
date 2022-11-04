import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import REDUCER_ACTIONS from "../ReducerActions";

function FoodInput({ meal, dispatch }) {
	const foodUri =
		"https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=en&id=";

	const [foodId, setFoodId] = useState("");

	/**
	 * Adds a food to the food list if it is not already in the list.
	 * @return true if the food is added to the list and false otherwise
	 */
	const addFood = (newFood) => {
		newFood = {
			foodCode: newFood["food_code"],
			description: newFood["food_description"],
			quantity: undefined,
			conversionFactor: 0.01 // default to gram conversion rate
		};

		if (meal.foods.some((food) => food.foodCode === newFood.foodCode)) {
			return false;
		}

		console.log("Adding food " + newFood.foodCode);
		dispatch({
			type: REDUCER_ACTIONS.ADD_FOOD,
			payload: { meal: meal, food: newFood }
		});

		return true;
	};

	// Update food ID based on user input
	const handleChange = (event) => {
		setFoodId(event.target.value);
	};

	// Try to fetch food from Nutrient File based on food ID
	const handleClick = async () => {
		if (foodId) {
			await fetch(foodUri + foodId)
				.then((result) => result.json())
				.then((json) => {
					if (json.length === 0) {
						console.log("Couldn't find food with that ID :(");
					} else {
						// Try to add first (and only) object in result
						if (addFood(json[0])) {
							setFoodId("");
						} else {
							console.log("That food is already in the list.");
						}
					}
				});
		}
	};

	// Call handleClick if user hits Enter
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleClick();
		}
	};

	return (
		<TextField
			placeholder="Enter food code"
			maxLength="5"
			size="small"
			value={foodId}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton
							variant="outlined"
							edge="end"
							onClick={handleClick}
						>
							<AddCircleOutlineIcon />
						</IconButton>
					</InputAdornment>
				)
			}}
		/>
	);
}

export default FoodInput;
