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

	// make this update nutrients state with selected nutrients
	// am I going to need to make a different state for selected nutrients?

	// Follow along with this example: https://codesandbox.io/s/66881433-moving-the-chips-tags-out-of-the-autocomplete-box-in-material-ui-forked-4izhw?file=/demo.js
	// Note the "value" state, passed in as the "value" prop and used for the onChange.
	// I bet this is how the list still knows what's selected. The value prop is all
	// selected options.

	// Might be best to have a NutrientController component, responsible for grabbing all the
	// nutrients. Pass those into this component as a constant list, no need for setting
	// it again. Then the state of this component will keep track of what's been selected.
	const handleChange = (event, values) => {
		console.log("Values: " + values);
		// values is a list of selected nutrients
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
