import { React, useState } from 'react';
import {
    IconButton,
    TextField,
    Card,
    CardContent,
    CardHeader,
    Collapse,
    Tooltip
} from '@mui/material';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Grid from '@mui/material/Grid';
import FoodInput from '../food/FoodInput';
import FoodCard from '../food/FoodCard';
import ReducerActions from '../enums/ReducerActions';
import DeleteMealButton from './DeleteMealButton';

function MealCard({ meal, dispatch, isOnlyMeal }) {
    const [name, setName] = useState(meal.name);
    const [collapsed, setCollapsed] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    // Update meal name based on user input
    const updateName = (event) => {
        dispatch({
            type: ReducerActions.UPDATE_NAME,
            payload: { meal, name: event.target.value }
        });
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Card variant="outlined" sx={{ border: 2, borderRadius: 5 }}>
            <CardHeader
                title={
                    <TextField
                        id="standard-basic"
                        autoComplete="off"
                        variant="standard"
                        placeholder="Untitled Meal"
                        value={name}
                        onChange={handleNameChange}
                        onBlur={updateName}
                        InputProps={{
                            style: {
                                color: '#183a1d'
                            }
                        }}
                    />
                }
                action={
                    <div>
                        <DeleteMealButton
                            meal={meal}
                            dispatch={dispatch}
                            isDisabled={isOnlyMeal}
                        />
                        <Tooltip title={collapsed ? 'Expand' : 'Collapse'}>
                            <IconButton onClick={toggleCollapsed}>
                                {/* Arrow direction depends on whether card is collapsed */}
                                {collapsed ? (
                                    <KeyboardArrowDownOutlinedIcon />
                                ) : (
                                    <KeyboardArrowUpOutlinedIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                    </div>
                }
            />
            <Collapse in={!collapsed}>
                <CardContent>
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12}>
                            <FoodInput meal={meal} dispatch={dispatch} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container rowSpacing={3}>
                                {meal.foods.map((food) => (
                                    <Grid item xs={12} key={food.foodCode}>
                                        <FoodCard
                                            meal={meal}
                                            food={food}
                                            dispatch={dispatch}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default MealCard;
