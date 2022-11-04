import Autocomplete from "@mui/material/Autocomplete";
import { Container } from "@mui/system";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

function NutrientSelect({ selectedNutrients, setSelectedNutrients }) {
	const nutrientNamesUri =
		"https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientname/?lang=en&type=json";

	const [nutrients, setNutrients] = useState([]);

	// Fetch nutrient list when page loads
	useEffect(() => {
		console.log("Fetching nutrient list");
		console.log(selectedNutrients);
		fetch(nutrientNamesUri) // fetch nutrients
			.then((result) => result.json()) // convert to JSON
			.then((json) =>
				setNutrients(
					json
						.map((nutrient) => {
							return {
								key: nutrient["nutrient_name_id"],
								id: nutrient["nutrient_name_id"],
								name: nutrient["nutrient_web_name"],
								unit: nutrient["unit"]
							};
						})
						.sort((a, b) => {
							return a.name > b.name ? 1 : -1; // sort alphabetically
						})
				)
			);
	}, []);

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

	return (
		<Container>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					Nutrients:
				</Grid>
				{/* Search bar */}
				<Grid item xs={12}>
					<Autocomplete
						multiple
						fullWidth
						onChange={handleChange}
						value={selectedNutrients}
						options={nutrients}
						getOptionLabel={(option) => option.name}
						// don't render selected options inside the search bar
						renderTags={() => null}
						// Options
						renderInput={(params) => (
							<TextField
								{...params}
								variant="filled"
								placeholder="Search"
							/>
						)}
					/>
				</Grid>
				{/* selected options */}
				<Grid item xs={12}>
					{selectedNutrients.map((nutrient) => {
						return (
							<Chip
								key={nutrient.id}
								label={nutrient.name}
								onDelete={handleDelete(nutrient)}
							/>
						);
					})}
				</Grid>
			</Grid>
		</Container>
	);
}

export default NutrientSelect;
