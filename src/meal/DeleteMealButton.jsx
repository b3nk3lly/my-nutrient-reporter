import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, Tooltip } from '@mui/material';
import ReducerActions from '../enums/ReducerActions';

function DeleteMealButton({ meal, dispatch, isDisabled }) {
    /**
     * Removes a meal. Prompts the user with a confirmation dialog if the meal contains any food.
     */
    const removeMeal = () => {
        if (
            meal.foods.length === 0 ||
            window.confirm(
                `Are you sure you want to delete ${
                    meal.name === '' ? 'Untitled Meal' : meal.name
                }?`
            )
        ) {
            dispatch({ type: ReducerActions.REMOVE_MEAL, payload: meal });
        }
    };

    return (
        <Tooltip title={isDisabled ? '' : 'Delete Meal'}>
            <span>
                <IconButton onClick={removeMeal} disabled={isDisabled}>
                    <DeleteOutlineIcon />
                </IconButton>
            </span>
        </Tooltip>
    );
}

export default DeleteMealButton;
