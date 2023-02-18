import Autocomplete from "@mui/material/Autocomplete";
import { Container } from "@mui/system";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { CardHeader, Grid, Card, CardContent, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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
	}, [selectedNutrients]);

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
			<Grid item xs={12}>
				Nutrients:
			</Grid>
			<Card variant="outlined" style={{ borderColor: "#e1eedd" }}>
				<CardHeader
					title={
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
									variant="standard"
									placeholder="Search"
								/>
							)}
							popupIcon={null}
							clearIcon={null}
						/>
					}
					action={
						<IconButton onClick={clearNutrients}>
							<DeleteOutlineIcon />
						</IconButton>
					}
					style={{ backgroundColor: "#e1eedd" }}
				/>
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
			</Card>
			<Grid container spacing={1}>
				{/* Search bar */}
				<Grid item xs={12}></Grid>
			</Grid>
		</Container>
	);
}

export default NutrientSelect;
