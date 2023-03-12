import { Grid } from '@mui/material';
import FoodCard from './FoodCard';

function FoodList({ meal, dispatch }) {
    return (
        <Grid container rowSpacing={3}>
            {meal.foods.map((food) => {
                return (
                    <Grid item xs={12} key={food.foodCode}>
                        <FoodCard meal={meal} food={food} dispatch={dispatch} />
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default FoodList;
