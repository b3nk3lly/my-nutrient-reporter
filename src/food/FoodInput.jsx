import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import { React, useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ReducerActions from '../enums/ReducerActions';

function FoodInput({ meal, dispatch }) {
    const foodUri =
        'https://food-nutrition.canada.ca/api/canadian-nutrient-file/food/?lang=en&type=json';

    const [food, setFood] = useState({ description: '' });
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            if (active) {
                fetch(foodUri) // fetch foods
                    .then((result) => result.json()) // convert to JSON
                    .then((json) =>
                        setOptions(
                            json
                                .map((foodOption) => ({
                                    foodCode: foodOption.food_code,
                                    description: foodOption.food_description,
                                    quantity: undefined,
                                    conversion: 0.01 // default to gram conversion rate
                                }))
                                .sort(
                                    (a, b) =>
                                        a.description > b.description ? 1 : -1 // sort alphabetically
                                )
                        )
                    );
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    // returns true if and only if the meal already contains a given food
    const isOptionSelected = (option) =>
        meal.foods.some(
            (foodInMeal) => foodInMeal.foodCode === option.foodCode
        );

    // match options by name or food code
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option) => option.description + option.foodCode
    });

    // Adds a food to the meal
    const addFood = (newFood) => {
        dispatch({
            type: ReducerActions.ADD_FOOD,
            payload: { meal, food: newFood }
        });
    };

    // Update food ID based on user input
    const handleChange = (event, value) => {
        if (value !== null) {
            addFood(value);
            setFood({ description: '' });
        }
    };

    return (
        <Autocomplete
            // don't include foods we already selected
            options={options.filter((option) => !isOptionSelected(option))}
            getOptionLabel={(foodOption) => foodOption.description}
            filterOptions={filterOptions}
            onChange={handleChange}
            blurOnSelect
            value={food}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            loading={loading}
            // don't render selected options inside the search bar
            renderTags={() => null}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    placeholder="Search by name or food code"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
            popupIcon={null}
            clearIcon={null}
        />
    );
}

export default FoodInput;
