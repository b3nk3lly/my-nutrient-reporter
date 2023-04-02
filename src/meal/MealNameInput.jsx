import { React, useState } from 'react';
import { TextField } from '@mui/material';
import ReducerActions from '../enums/ReducerActions';
import Colors from '../enums/Colors';

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
                    color: Colors.DARK_GREEN
                }
            }}
            fullWidth
        />
    );
}

export default MealNameInput;
