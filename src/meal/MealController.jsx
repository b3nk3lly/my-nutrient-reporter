import { React, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
    Container,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import ReducerActions from '../enums/ReducerActions';
import MealCard from './MealCard';
import SectionHeader from '../layout/SectionHeader';

function MealController({ meals, dispatch }) {
    const [nextMealKey, setNextMealKey] = useState(1);

    const addMeal = () => {
        dispatch({
            type: ReducerActions.ADD_MEAL,
            payload: { id: nextMealKey, name: 'Untitled Meal' }
        });
        setNextMealKey(nextMealKey + 1);
    };

    return (
        <Container>
            <SectionHeader
                renderHeader={() => <Typography variant="h2">Meals</Typography>}
                helperText="Enter the food that you ate"
            />
            <Grid
                container
                rowSpacing={3}
                alignItems="center"
                justifyContent="center"
            >
                {meals.map((meal) => (
                    <Grid item xs={12} key={meal.id}>
                        <MealCard
                            meal={meal}
                            dispatch={dispatch}
                            isOnlyMeal={meals.length === 1}
                        />
                    </Grid>
                ))}
                <Grid item>
                    <Tooltip title="Add Meal">
                        <IconButton
                            onClick={addMeal}
                            sx={{ transform: 'scale(1.2)' }}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Container>
    );
}

export default MealController;
