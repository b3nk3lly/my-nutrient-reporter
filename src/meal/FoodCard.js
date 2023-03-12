import React from 'react';
import Grid from '@mui/material/Grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    Card,
    CardContent,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import ReducerActions from '../enums/ReducerActions';
import QuantityInput from './QuantityInput';

function FoodCard({ meal, food, dispatch }) {
    // Remove the food item when the Remove button is clicked
    const removeFood = () => {
        dispatch({
            type: ReducerActions.REMOVE_FOOD,
            payload: { meal: meal, foodCode: food.foodCode }
        });
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 5, borderColor: 'gray' }}>
            <CardContent>
                <Grid container rowSpacing={1}>
                    {/* Top row */}
                    <Grid item xs={11}>
                        <Typography>{food.description}</Typography>
                        <Typography variant="caption">
                            {'Food code: ' + food.foodCode}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Delete">
                            <IconButton onClick={removeFood}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Tooltip>
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
