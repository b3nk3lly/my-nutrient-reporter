import { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import ReducerActions from "../enums/ReducerActions";

function ServingUnit({ meal, food, dispatch }) {
	const servingSizesUri =
		"https://food-nutrition.canada.ca/api/canadian-nutrient-file/servingsize/?lang=en&id=";

	const [units, setUnits] = useState([]);

	// Set conversion factor based on serving size dropdown
	const handleUnitChange = (event) => {
		dispatch({
			type: ReducerActions.UPDATE_CONVERSION,
			payload: { meal: meal, food: food, conversion: event.target.value }
		});
	};

	// Fetch serving sizes for the given food ID
	useEffect(() => {
		let quantityRegex = /^[0-9]+(\/[0-9]+)?/;
		let processUnits = (units) => {
			units = units
				// filter out meaningless serving sizes
				.filter(
					(unit) => unit["measure_name"] !== "no serving specified"
				)
				// filter options that include a number of grams measurement
				.filter((unit) => !/[0-9]+g/.test(unit["measure_name"]))
				// simplify unit options
				.map((unit) => {
					// get the quantity of the serving size
					let quantity = unit["measure_name"].match(quantityRegex)[0];

					// if it's a fraction, compute the fraction
					if (quantity.includes("/")) {
						let fraction = quantity.split("/");
						quantity = fraction[0] / fraction[1];
					}

					// calculate the conversion factor per single unit
					unit["conversion_factor_value"] /= quantity;

					// format unit name
					unit["measure_name"] = unit["measure_name"]
						.replace(quantityRegex, "") // remove quantity
						.replace(/s$/, "") // remove trailing s
						.trim();

					return unit;
				})
				// filter out duplicate units
				.filter(
					(v, i, a) =>
						a.findIndex(
							(v2) => v2["measure_name"] === v["measure_name"]
						) === i
				);

			// if there is a unit for grams, remove it.
			// we hard-code this as the default
			units = units.filter((unit) => unit["measure_name"] !== "g");

			// sort units alphabetically
			units = units.sort((a, b) => {
				return a["measure_name"] > b["measure_name"] ? 1 : -1;
			});

			setUnits(units);
		};

		fetch(servingSizesUri + food.foodCode) // fetch serving sizes for the food ID
			.then((result) => result.json())
			.then((json) => processUnits(json));
	}, [food.foodCode]);

	return (
		<Select
			defaultValue="0.01"
			size="small"
			onChange={handleUnitChange}
			variant="standard"
			disableUnderline
		>
			{/* select grams by default, since it's what CNF uses for nutrients
				per food */}
			<MenuItem value="0.01" selected>
				g
			</MenuItem>
			{
				// Display units fetched from CNF API
				units.map((unit, index) => {
					return (
						<MenuItem
							key={food.foodCode + "-" + index}
							value={unit["conversion_factor_value"]}
						>
							{unit["measure_name"]}
						</MenuItem>
					);
				})
			}
		</Select>
	);
}

export default ServingUnit;
