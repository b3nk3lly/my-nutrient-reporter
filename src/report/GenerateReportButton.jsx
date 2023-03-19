import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import '../styles/App.css';
import writeNutrientReport from './NutrientReportWriter';

/**
 * Returns true if and only if all meals contain at least one food,
 * all foods have a quantity, and at least one nutrient is selected.
 * If any of these criteria are not met, an alert is displayed.
 */
const validate = (meals, nutrients) => {
    const mealsAreValid = meals.every((meal) => {
        const mealName = meal.name === '' ? 'Untitled Meal' : meal.name;

        if (meal.foods.length === 0) {
            window.alert(
                `Please enter at least one food for meal ${mealName}.`
            );

            return false;
        }

        return meal.foods.every((food) => {
            if (!food.quantity || food.quantity === 0) {
                window.alert(
                    `Please enter a quantity for ${food.description} in ${mealName}`
                );
                return false;
            }

            return true;
        });
    });

    if (!mealsAreValid) {
        return false;
    }

    if (nutrients.length === 0) {
        window.alert('Please select at least one nutrient.');
        return false;
    }

    return true;
};

const handleClick = (meals, nutrients) => {
    if (validate(meals, nutrients)) {
        writeNutrientReport(meals, nutrients);
    }
};

function GenerateReportButton({ meals, nutrients }) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: '1rem' }}
        >
            <Button
                onClick={() => handleClick(meals, nutrients)}
                className="Button"
                variant="outlined"
                sx={{ borderWidth: 2, borderRadius: 5 }}
            >
                <Typography variant="button">Generate Report</Typography>
            </Button>
        </Box>
    );
}

export default GenerateReportButton;
