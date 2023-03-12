import { React, useState } from 'react';
import { FormControl, TextField } from '@mui/material';
import ReducerActions from '../enums/ReducerActions';
import QuantityValidity from '../enums/QuantityValidity';
import QuantityErrorMessage from '../error-messages/QuantityErrorMessage';
import ServingUnit from './ServingUnit';

function QuantityInput({ meal, food, dispatch }) {
    const [quantity, setQuantity] = useState();
    const [validity, setValidity] = useState(QuantityValidity.VALID);

    const handleQuantityChange = (event) => {
        const newQuantity = event.target.value;

        if (!newQuantity) {
            setValidity(QuantityValidity.EMPTY);
        } else if (Number.isNaN(newQuantity)) {
            setValidity(QuantityValidity.NAN);
        } else if (newQuantity <= 0) {
            setValidity(QuantityValidity.NON_POSITIVE);
        } else {
            setValidity(QuantityValidity.VALID);
        }

        setQuantity(newQuantity);
    };

    // Set quantity based on the textbox
    const dispatchQuantity = () => {
        dispatch({
            type: ReducerActions.UPDATE_QUANTITY,
            payload: { meal, food, quantity }
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
                    <FormControl>
                        <ServingUnit
                            meal={meal}
                            food={food}
                            dispatch={dispatch}
                        />
                    </FormControl>
                )
            }}
            onChange={handleQuantityChange}
            onBlur={dispatchQuantity}
            helperText={<QuantityErrorMessage validity={validity} />}
        />
    );
}

export default QuantityInput;
