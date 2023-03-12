import { React, useState } from 'react';
import { TextField } from '@mui/material';
import ReducerActions from '../enums/ReducerActions';

function MealNameInput({ meal, dispatch }) {
    const [name, setName] = useState(meal.name);

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

    return (
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
    );
}

export default MealNameInput;
