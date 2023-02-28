import Autocomplete from "@mui/material/Autocomplete";
import { Container } from "@mui/system";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import {
	CardHeader,
	Grid,
	Card,
	CardContent,
	IconButton,
	Tooltip
} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Macronutrients from "../enums/Macronutrients";
import MacronutrientTooltip from "./MacronutrientTooltip";

function NutrientSelect({ selectedNutrients, setSelectedNutrients }) {
	const nutrientNamesUri =
		"https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientname/?lang=en&type=json";

	const [nutrients, setNutrients] = useState([]);

	/**
	 * Maps JSON to a nutrient.
	 */
	const newNutrient = (nutrient) => {
		return {
			key: nutrient["nutrient_name_id"],
			id: nutrient["nutrient_name_id"],
			name: nutrient["nutrient_web_name"],
			unit: nutrient["unit"]
		};
	};

	// Fetch nutrient list when page loads
	useEffect(() => {
		async function fetchNutrients() {
			let result = await fetch(nutrientNamesUri); // fetch nutrients
			let json = await result.json(); // convert to JSON

			// find the macronutrients Protein, Total Fat, and Carbohydrates
			// and have them selected by default
			let macronutrients = json
				.filter((nutrient) =>
					[
						Macronutrients.PROTEIN,
						Macronutrients.FAT,
						Macronutrients.CARBS
					].includes(nutrient["nutrient_name_id"])
				)
				.map(newNutrient);

			setSelectedNutrients(macronutrients);

			setNutrients(
				json.map(newNutrient).sort((a, b) => {
					return a.name > b.name ? 1 : -1; // sort alphabetically
				})
			);
		}

		fetchNutrients();
	}, []);

	/**
	 * 	Returns true if and only if the nutrient is already selected
	 */
	const isOptionSelected = (option) => {
		return selectedNutrients.some((nutrient) => nutrient.id === option.id);
	};

	const handleChange = (event, values) => {
		setSelectedNutrients(values);
	};

	const handleDelete = (deletedNutrient) => () => {
		console.log(deletedNutrient);
		let newNutrients = selectedNutrients.filter(
			(nutrient) => nutrient.id !== deletedNutrient.id
		);

		setSelectedNutrients(newNutrients);
	};

	const clearNutrients = () => {
		setSelectedNutrients([]);
	};

	return (
		<Container>
			<Grid item xs={12} display="flex" alignItems={"center"}>
				<h2>Nutrients</h2>
				<MacronutrientTooltip />
			</Grid>
			<Card
				variant="outlined"
				//style={{ borderColor: "#e1eedd" }}
				sx={{ border: 2, borderRadius: 5 }}
			>
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
							{selectedNutrients.map((nutrient) => {
								return (
									<Grid item key={nutrient.id}>
										<Chip
											label={nutrient.name}
											onDelete={handleDelete(nutrient)}
										/>
									</Grid>
								);
							})}
						</Grid>
					</CardContent>
				) : null}
			</Card>
		</Container>
	);
}

export default NutrientSelect;
