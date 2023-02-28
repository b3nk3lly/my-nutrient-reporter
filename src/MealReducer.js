import ReducerActions from "./enums/ReducerActions";

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

			return meals;
		}

		default:
			return meals;
	}
};

export default mealReducer;
