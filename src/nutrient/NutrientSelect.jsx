import Autocomplete from '@mui/material/Autocomplete';
import { Container } from '@mui/system';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { React, useState, useEffect } from 'react';
import {
    CardHeader,
    Grid,
    Card,
    CardContent,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Macronutrients from '../enums/Macronutrients';
import MacronutrientTooltip from './MacronutrientTooltip';
import SectionHeader from '../layout/SectionHeader';

function NutrientSelect({ selectedNutrients, setSelectedNutrients }) {
    const nutrientNamesUri =
        'https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientname/?lang=en&type=json';

    const [nutrients, setNutrients] = useState([]);

    /**
     * Maps JSON to a nutrient.
     */
    const newNutrient = (nutrient) => ({
        key: nutrient.nutrient_name_id,
        id: nutrient.nutrient_name_id,
        name: nutrient.nutrient_web_name,
        unit: nutrient.unit
    });

    // Fetch nutrient list when page loads
    useEffect(() => {
        async function fetchNutrients() {
            const result = await fetch(nutrientNamesUri); // fetch nutrients
            const json = await result.json(); // convert to JSON

            // find the macronutrients Protein, Total Fat, and Carbohydrates
            // and have them selected by default
            const macronutrients = json
                .filter((nutrient) =>
                    [
                        Macronutrients.PROTEIN,
                        Macronutrients.FAT,
                        Macronutrients.CARBS
                    ].includes(nutrient.nutrient_name_id)
                )
                .map(newNutrient);

            setSelectedNutrients(macronutrients);

            setNutrients(
                json.map(newNutrient).sort(
                    (a, b) => (a.name > b.name ? 1 : -1) // sort alphabetically
                )
            );
        }

        fetchNutrients();
    }, [setSelectedNutrients]);

    /**
     * 	Returns true if and only if the nutrient is already selected
     */
    const isOptionSelected = (option) =>
        selectedNutrients.some((nutrient) => nutrient.id === option.id);

    const handleChange = (event, values) => {
        setSelectedNutrients(values);
    };

    const handleDelete = (deletedNutrient) => () => {
        const newNutrients = selectedNutrients.filter(
            (nutrient) => nutrient.id !== deletedNutrient.id
        );

        setSelectedNutrients(newNutrients);
    };

    const clearNutrients = () => {
        if (
            selectedNutrients.length > 0 &&
            window.confirm(
                'Are you sure you want to remove all selected nutrients?'
            )
        ) {
            setSelectedNutrients([]);
        }
    };

    return (
        <Container>
            <SectionHeader
                renderHeader={() => (
                    <Grid item display="flex" alignItems="center">
                        <Typography variant="h2">Nutrients</Typography>
                        <MacronutrientTooltip />
                    </Grid>
                )}
                helperText="Select the nutrients you want to track"
            />
            <Card variant="outlined" sx={{ border: 2, borderRadius: 5 }}>
                <CardHeader
                    title={
                        <Autocomplete
                            multiple
                            fullWidth
                            onChange={handleChange}
                            value={selectedNutrients}
                            options={nutrients.filter(
                                (nutrient) => !isOptionSelected(nutrient)
                            )}
                            getOptionLabel={(option) => option.name}
                            // don't render selected options inside the search bar
                            renderTags={() => null}
                            // Options
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    placeholder="Search"
                                />
                            )}
                            popupIcon={null}
                            clearIcon={null}
                        />
                    }
                    action={
                        <Tooltip title="Clear All">
                            <IconButton onClick={clearNutrients}>
                                <ClearOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    }
                />
                {selectedNutrients.length > 0 ? (
                    <CardContent>
                        {/* selected options */}
                        <Grid container columnSpacing={1} rowSpacing={1}>
                            {selectedNutrients.map((nutrient) => (
                                <Grid item key={nutrient.id}>
                                    <Chip
                                        label={nutrient.name}
                                        onDelete={handleDelete(nutrient)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                ) : null}
            </Card>
        </Container>
    );
}

export default NutrientSelect;
