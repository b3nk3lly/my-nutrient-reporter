import { React, useState } from 'react';
import { TextField } from '@mui/material';
import ReducerActions from '../enums/ReducerActions';
import QuantityValidity from '../enums/QuantityValidity';
import QuantityErrorMessage from '../error-messages/QuantityErrorMessage';
import ServingUnit from './ServingUnit';

function QuantityInput({ meal, food, dispatch }) {
    const [quantity, setQuantity] = useState();
    const [validity, setValidity] = useState(QuantityValidity.VALID);

    const handleQuantityChange = (event) => {
        const _quantity = event.target.value;

        if (!_quantity) {
            setValidity(QuantityValidity.EMPTY);
        } else if (isNaN(_quantity)) {
            setValidity(QuantityValidity.NAN);
        } else if (_quantity <= 0) {
            setValidity(QuantityValidity.NON_POSITIVE);
        } else {
            setValidity(QuantityValidity.VALID);
        }

        setQuantity(_quantity);
    };

    // Set quantity based on the textbox
    const dispatchQuantity = () => {
        dispatch({
            type: ReducerActions.UPDATE_QUANTITY,
            payload: { meal: meal, food: food, quantity: quantity }
        });
    };

    return (
        <TextField
            error={validity !== QuantityValidity.VALID}
            placeholder="Enter quantity"
            size="small"
            autoComplete="off"
            InputProps={{
                endAdornment: (
                    <ServingUnit meal={meal} food={food} dispatch={dispatch} />
                )
            }}
            onChange={handleQuantityChange}
            onBlur={dispatchQuantity}
            helperText={<QuantityErrorMessage validity={validity} />}
        />
    );
}

export default QuantityInput;
