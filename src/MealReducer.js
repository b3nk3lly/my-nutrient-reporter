import ReducerActions from './enums/ReducerActions';

const mealReducer = (meals, action) => {
    switch (action.type) {
        case ReducerActions.ADD_MEAL:
            return [...meals, { id: action.payload.id, name: '', foods: [] }];

        case ReducerActions.REMOVE_MEAL:
            return meals.filter((meal) => meal.id !== action.payload.id);

        case ReducerActions.UPDATE_NAME:
            return meals.map((meal) => {
                if (meal.id === action.payload.meal.id) {
                    const newMeal = { ...meal };
                    newMeal.name = action.payload.name;
                    return newMeal;
                }
                return meal;
            });

        case ReducerActions.ADD_FOOD:
            return meals.map((meal) => {
                if (meal.id === action.payload.meal.id) {
                    const newMeal = { ...meal };
                    newMeal.foods = [...meal.foods, action.payload.food];
                    return newMeal;
                }
                return meal;
            });

        case ReducerActions.REMOVE_FOOD:
            return meals.map((meal) => {
                if (meal.id === action.payload.meal.id) {
                    const newMeal = { ...meal };
                    newMeal.foods = meal.foods.filter(
                        (food) => food.foodCode !== action.payload.foodCode
                    );
                    return newMeal;
                }
                return meal;
            });

        case ReducerActions.UPDATE_QUANTITY: {
            const foodToUpdate = meals
                .find((meal) => meal.id === action.payload.meal.id)
                .foods.find(
                    (food) => food.foodCode === action.payload.food.foodCode
                );

            foodToUpdate.quantity = action.payload.quantity;

            return meals;
        }

        case ReducerActions.UPDATE_CONVERSION: {
            const foodToUpdate = meals
                .find((meal) => meal.id === action.payload.meal.id)
                .foods.find(
                    (food) => food.foodCode === action.payload.food.foodCode
                );

            foodToUpdate.conversion = action.payload.conversion;

            return meals;
        }

        default:
            return meals;
    }
};

export default mealReducer;
