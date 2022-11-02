import { useState, useReducer } from "react";
import { Grid } from "@mui/material";
import "./App.css";
import MealController from "./meal/MealController";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import NutrientSelection from "./nutrient/NutrientSelection";
import REDUCER_ACTIONS from "./ReducerActions";
import ReportGenerator from "./ReportGenerator";
import Theme from "./Theme";

const mealReducer = (meals, action) => {
	switch (action.type) {
		case REDUCER_ACTIONS.ADD_MEAL:
			return [...meals, { id: action.payload.id, name: "", foods: [] }];

		case REDUCER_ACTIONS.REMOVE_MEAL:
			return meals.filter((meal) => meal.id !== action.payload.id);

		case REDUCER_ACTIONS.UPDATE_NAME:
			return meals.map((meal) => {
				if (meal.id === action.payload.meal.id) {
					let newMeal = { ...meal };
					newMeal.name = action.payload.name;
					return newMeal;
				}
				return meal;
			});

		case REDUCER_ACTIONS.ADD_FOOD:
			return meals.map((meal) => {
				if (meal.id === action.payload.meal.id) {
					let newMeal = { ...meal };
					newMeal.foods = [...meal.foods, action.payload.food];
					return newMeal;
				}
				return meal;
			});

		case REDUCER_ACTIONS.REMOVE_FOOD:
			return meals.map((meal) => {
				if (meal.id === action.payload.meal.id) {
					let newMeal = { ...meal };
					newMeal.foods = meal.foods.filter(
						(food) => food.foodCode !== action.payload.foodCode
					);
					return newMeal;
				}
				return meal;
			});

		case REDUCER_ACTIONS.UPDATE_QUANTITY: {
			let mealIndex = meals.findIndex(
				(meal) => meal.id === action.payload.meal.id
			);
			let foodIndex = meals[mealIndex].foods.findIndex(
				(food) => food.foodCode === action.payload.food.foodCode
			);
			meals[mealIndex].foods[foodIndex].quantity =
				action.payload.quantity;
			console.log("Set quantity to " + action.payload.quantity);
			return meals;
		}

		case REDUCER_ACTIONS.UPDATE_CONVERSION: {
			let mealIndex = meals.findIndex(
				(meal) => meal.id === action.payload.meal.id
			);
			let foodIndex = meals[mealIndex].foods.findIndex(
				(food) => food.foodCode === action.payload.food.foodCode
			);
			meals[mealIndex].foods[foodIndex].conversion =
				action.payload.conversion;
			console.log("Set conversion to " + action.payload.conversion);
			return meals;
		}

		default:
			return meals;
	}
};

function App() {
	const [meals, mealDispatch] = useReducer(mealReducer, [
		{ id: 0, name: "", foods: [] }
	]);

	const [nutrients, setNutrients] = useState([]);

	return (
		<ThemeProvider theme={Theme()}>
			<CssBaseline />
			<Grid container>
				<Grid item xs={1} style={{ backgroundColor: "#e1eedd" }}></Grid>
				<Grid item xs={10}>
					<Grid
						item
						xs={12}
						style={{ textAlign: "center", color: "#f6c453" }}
					>
						<h1>Nutrition Reporter</h1>
					</Grid>
				</Grid>
				<Grid item xs={1} style={{ backgroundColor: "#e1eedd" }}></Grid>
			</Grid>
			<Grid container rowSpacing={5}>
				<Grid item xs={1} style={{ backgroundColor: "#e1eedd" }}></Grid>
				<Grid item xs={10}>
					<MealController meals={meals} dispatch={mealDispatch} />
				</Grid>
				<Grid item xs={1} style={{ backgroundColor: "#e1eedd" }}></Grid>

				<Grid item xs={1} style={{ backgroundColor: "#e1eedd" }}></Grid>
				<Grid item xs={10}>
					<NutrientSelection
						nutrients={nutrients}
						setNutrients={setNutrients}
					/>
				</Grid>
				<Grid item xs={1} style={{ backgroundColor: "#e1eedd" }}></Grid>

				<Grid item xs={1} style={{ backgroundColor: "#e1eedd" }}></Grid>
				<Grid item xs={10}>
					<ReportGenerator meals={meals} nutrients={nutrients} />
				</Grid>
				<Grid item xs={1} style={{ backgroundColor: "#e1eedd" }}></Grid>

				<Grid item xs={1} style={{ backgroundColor: "#e1eedd" }}></Grid>
				<Grid item xs={10} />
				<Grid item xs={1} style={{ backgroundColor: "#e1eedd" }}></Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default App;
