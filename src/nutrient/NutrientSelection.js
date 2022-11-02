import { Grid, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import NutrientButton from "./NutrientButton";

function NutrientSelection({ nutrients, setNutrients }) {
	const nutrientNamesUri =
		"https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientname/?lang=en&type=json";

	// Fetch nutrient list when page loads
	useEffect(() => {
		console.log("Fetching nutrient list");
		fetch(nutrientNamesUri) // fetch nutrients
			.then((result) => result.json()) // convert to JSON
			.then((json) =>
				setNutrients(
					json
						.map((nutrient) => {
							return {
								id: nutrient["nutrient_name_id"],
								name: nutrient["nutrient_web_name"],
								unit: nutrient["unit"],
								selected: false
							};
						})
						.sort((a, b) => {
							return a.name > b.name ? 1 : -1; // sort alphabetically
						})
				)
			);
	}, []);

	const selectAllNutrients = () => {
		setNutrients(
			nutrients.map((nutrient) => {
				return { ...nutrient, selected: true };
			})
		);
	};

	const deselectAllNutrients = () => {
		setNutrients(
			nutrients.map((nutrient) => {
				return { ...nutrient, selected: false };
			})
		);
	};

	return (
		<Container>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					Nutrients:
				</Grid>

				<Grid item xs={12}>
					<Button
						size="small"
						variant="outlined"
						onClick={selectAllNutrients}
					>
						Select All
					</Button>
					<Button
						size="small"
						variant="outlined"
						onClick={deselectAllNutrients}
					>
						Deselect All
					</Button>
				</Grid>

				<Grid container justifyContent="center" spacing={1}>
					{nutrients.map((nutrient) => {
						return (
							<Grid item key={nutrient.id}>
								<NutrientButton
									nutrient={nutrient}
									nutrients={nutrients}
									setNutrients={setNutrients}
								/>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
		</Container>
	);
}

export default NutrientSelection;
