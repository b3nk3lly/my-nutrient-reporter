import { Button, Box, Typography } from "@mui/material";
import Excel from "exceljs";
import FileSaver from "file-saver";
import "../App.css";
import Macronutrients from "../enums/Macronutrients";

const nutrientAmountUri =
	"https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?lang=en&id=";

const getNutrientAmountPerFood = async (nutrient, food) => {
	let response = await fetch(nutrientAmountUri + food.foodCode);
	console.log(nutrientAmountUri + food.foodCode);
	console.log(nutrient.id);
	let json = await response.json();

	// get the nutrient with id that matches the one we're looking for
	let relevantResult = json.find(
		(result) => result["nutrient_name_id"] == nutrient.id
	);

	let nutrientAmount = relevantResult ? relevantResult["nutrient_value"] : 0;

	console.log("amount: " + nutrientAmount);
	console.log("conversion: " + food.conversion);
	console.log("quantity: " + food.quantity);

	// calculate amount of the nutrient per food
	return nutrientAmount * food.conversion * food.quantity;
};

/**
 * Returns true if and only if the list of nutrients contains Protein,
 * Total Fat, and Carbohydrates.
 */
const containsAllMacronutrients = (nutrients) => {
	return (
		nutrients.some((nutrient) => nutrient.id === Macronutrients.PROTEIN) &&
		nutrients.some((nutrient) => nutrient.id === Macronutrients.FAT) &&
		nutrients.some((nutrient) => nutrient.id === Macronutrients.CARBS)
	);
};

const writeMacronutrientReport = (
	workbook,
	totalProtein,
	totalFat,
	totalCarbs
) => {
	let worksheet = workbook.addWorksheet("Macronutrient Report");

	worksheet.columns = [
		{ header: "Macronutrient Distribution" },
		{ header: "Protein" },
		{ header: "Fat" },
		{ header: "Carbohydrates" },
		{ header: "Total" }
	];

	let KCALS_PER_GRAM_PROTEIN = 4;
	let KCALS_PER_GRAM_FAT = 9;
	let KCALS_PER_GRAM_CARBS = 4;

	let kcalProtein = totalProtein * KCALS_PER_GRAM_PROTEIN;
	let kcalFat = totalFat * KCALS_PER_GRAM_FAT;
	let kcalCarbs = totalCarbs * KCALS_PER_GRAM_CARBS;
	let kcalTotal = kcalProtein + kcalFat + kcalCarbs;

	worksheet.addRow([
		"Calculated Energy for Macronutrient Distribution (kCal)",
		parseFloat(kcalProtein.toFixed(2)),
		parseFloat(kcalFat.toFixed(2)),
		parseFloat(kcalCarbs.toFixed(2)),
		parseFloat(kcalTotal.toFixed(2))
	]);

	worksheet.addRow([
		"Calculated Energy for Macronutrient Distribution (%)",
		parseFloat(((kcalProtein / kcalTotal) * 100).toFixed(2)),
		parseFloat(((kcalFat / kcalTotal) * 100).toFixed(2)),
		parseFloat(((kcalCarbs / kcalTotal) * 100).toFixed(2)),
		100.0
	]);
};

function ReportGenerator({ meals, nutrients }) {
	/**
	 * Returns true if and only if all meals contain at least one food,
	 * all foods have a quantity, and at least one nutrient is selected.
	 * If any of these criteria are not met, an alert is displayed.
	 */
	const validate = () => {
		for (let meal of meals) {
			let mealName = meal.name == "" ? "Untitled Meal" : meal.name;

			if (meal.foods.length === 0) {
				window.alert(
					`Please enter at least one food for meal ${mealName}.`
				);
				return false;
			}

			for (let food of meal.foods) {
				if (!food.quantity || food.quantity === 0) {
					window.alert(
						`Please enter a quantity for ${food.description} in ${mealName}`
					);
					return false;
				}
			}
		}

		if (nutrients.length === 0) {
			window.alert("Please select at least one nutrient.");
			return false;
		}

		return true;
	};

	const generateReport = async () => {
		if (!validate()) {
			return;
		}

		let workbook = new Excel.Workbook();
		let worksheet = workbook.addWorksheet("Nutrient Report");

		let headers = [
			{ header: "Food" },
			{ header: "Food Code" },
			{ header: "Quantity (g)" }
		];

		nutrients.forEach((nutrient) => {
			headers.push({
				header: nutrient.name + " (" + nutrient.unit + ") "
			});
		});

		worksheet.columns = headers;

		let totalProtein = 0;
		let totalFat = 0;
		let totalCarbs = 0;

		// for each meal
		//    for each food
		//       for each nutrient
		//          get the amount of the nutrient in the quantity of food

		for (let meal of meals) {
			worksheet.addRow([meal.name]);

			for (let food of meal.foods) {
				console.log(food);
				let newRow = [
					food.description,
					food.foodCode,
					food.quantity * food.conversion * 100 // specify quantity in grams
				];

				for (let nutrient of nutrients) {
					console.log("Nutrient " + nutrient.name);
					let nutrientAmountPerFood = await getNutrientAmountPerFood(
						nutrient,
						food
					);

					if (nutrient.id === Macronutrients.PROTEIN) {
						totalProtein += nutrientAmountPerFood;
					} else if (nutrient.id === Macronutrients.FAT) {
						totalFat += nutrientAmountPerFood;
					} else if (nutrient.id === Macronutrients.CARBS) {
						totalCarbs += nutrientAmountPerFood;
					}

					// Round result to 2 decimal points
					newRow.push(
						Math.round(
							(nutrientAmountPerFood + Number.EPSILON) * 100
						) / 100
					);

					console.log("Pushed new value, " + nutrientAmountPerFood);
				}

				worksheet.addRow(newRow);
			}

			worksheet.addRow();
		}

		if (containsAllMacronutrients(nutrients)) {
			writeMacronutrientReport(
				workbook,
				totalProtein,
				totalFat,
				totalCarbs
			);
		}

		workbook.xlsx
			.writeBuffer()
			.then((data) => {
				let blob = new Blob([data]);
				FileSaver.saveAs(blob, "test.xlsx");
				console.log("Generated report.");
			})
			.catch((error) => console.log(error));
	};

	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			<Button
				onClick={generateReport}
				className="Button"
				variant="outlined"
				sx={{ borderWidth: 2, borderRadius: 5 }}
			>
				<Typography variant="button">Generate Report</Typography>
			</Button>
		</Box>
	);
}

export default ReportGenerator;
