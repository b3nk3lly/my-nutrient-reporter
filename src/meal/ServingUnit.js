import { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import REDUCER_ACTIONS from "../ReducerActions";

function ServingUnit({ meal, food, dispatch }) {
	const servingSizesUri =
		"https://food-nutrition.canada.ca/api/canadian-nutrient-file/servingsize/?lang=en&id=";

	const [units, setUnits] = useState([]);

	// Set conversion factor based on serving size dropdown
	const handleUnitChange = (event) => {
		console.log("Setting conversion factor to " + event.target.value);
		dispatch({
			type: REDUCER_ACTIONS.UPDATE_CONVERSION,
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
						//.replace(/^g\b/, "grams")
						//.replace(/^ml\b/, "millilitres")
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

			// if there is no unit for grams, add it
			if (!units.some((unit) => unit["measure_name"] === "g")) {
				units.push({
					conversion_factor_value: "0.01",
					measure_name: "g"
				});
			}

			// sort units alphabetically
			units = units.sort((a, b) => {
				return a["measure_name"] > b["measure_name"] ? 1 : -1;
			});

			setUnits(units);
		};

		console.log("Fetching serving sizes for food ID" + food.foodCode);
		fetch(servingSizesUri + food.foodCode) // fetch serving sizes for the food ID
			.then((result) => result.json())
			.then((json) => processUnits(json));
	}, [food.foodCode]);

	return (
		<Select defaultValue="0" size="small" onChange={handleUnitChange}>
			{
				// Default option shouldn't appear in the dropdown
			}
			<MenuItem disabled value="0" style={{ display: "none" }}>
				Unit
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
