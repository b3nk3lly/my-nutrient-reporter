import { useState, useReducer } from "react";
import { Divider, Grid } from "@mui/material";
import "./App.css";
import MealController from "./meal/MealController";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import NutrientSelect from "./nutrient/NutrientSelect";
import ReducerActions from "./enums/ReducerActions";
import ReportGenerator from "./report/ReportGenerator";
import Theme from "./Theme";
import Header from "./Header";
import Footer from "./Footer";

const mealReducer = (meals, action) => {
	switch (action.type) {
		case ReducerActions.ADD_MEAL:
			return [...meals, { id: action.payload.id, name: "", foods: [] }];

		case ReducerActions.REMOVE_MEAL:
			return meals.filter((meal) => meal.id !== action.payload.id);

		case ReducerActions.UPDATE_NAME:
			return meals.map((meal) => {
				if (meal.id === action.payload.meal.id) {
					let newMeal = { ...meal };
					newMeal.name = action.payload.name;
					return newMeal;
				}
				return meal;
			});

		case ReducerActions.ADD_FOOD:
			return meals.map((meal) => {
				if (meal.id === action.payload.meal.id) {
					let newMeal = { ...meal };
					newMeal.foods = [...meal.foods, action.payload.food];
					return newMeal;
				}
				return meal;
			});

		case ReducerActions.REMOVE_FOOD:
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

		case ReducerActions.UPDATE_QUANTITY: {
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

		case ReducerActions.UPDATE_CONVERSION: {
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

	const [selectedNutrients, setSelectedNutrients] = useState([]);

	return (
		<ThemeProvider theme={Theme()}>
			<CssBaseline />

			<Grid container rowSpacing={1}>
				<Grid item xs={12}>
					<Header />
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item xs={12}>
					<MealController meals={meals} dispatch={mealDispatch} />
				</Grid>
				<Grid item xs={12}>
					<NutrientSelect
						selectedNutrients={selectedNutrients}
						setSelectedNutrients={setSelectedNutrients}
					/>
				</Grid>
				<Grid item xs={12}>
					<ReportGenerator
						meals={meals}
						nutrients={selectedNutrients}
					/>
				</Grid>
				<Grid item xs={12}>
					<Footer />
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default App;
