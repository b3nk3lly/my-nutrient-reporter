import Excel from "exceljs";
import FileSaver from "file-saver";
import Macronutrients from "../enums/Macronutrients";
import writeMacronutrientReport from "./MacronutrientReportWriter";

const nutrientAmountUri =
	"https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?lang=en&id=";

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

const writeNutrientReport = async (meals, nutrients) => {
	let workbook = new Excel.Workbook();
	let worksheet = workbook.addWorksheet("Nutrient Report");

	let headers = [
		{ header: "Food" },
		{ header: "Food Code" },
		{ header: "Quantity (g)", style: { numFmt: "0.00" } }
	];

	for (let nutrient of nutrients) {
		headers.push({
			header: nutrient.name + " (" + nutrient.unit + ") ",
			style: { numFmt: "0.00" }
		});
	}

	worksheet.columns = headers;

	let grandTotals = {};
	grandTotals["quantity"] = 0;
	nutrients.forEach((nutrient) => (grandTotals[nutrient.id] = 0));

	for (let meal of meals) {
		let mealTotals = {};
		mealTotals["quantity"] = 0;
		nutrients.forEach((nutrient) => (mealTotals[nutrient.id] = 0));

		worksheet.addRow([meal.name]);

		for (let food of meal.foods) {
			// calculate quantity in grams
			let gramsQuantity = food.quantity * food.conversion * 100;

			mealTotals["quantity"] += gramsQuantity;
			grandTotals["quantity"] += gramsQuantity;

			let newRow = [food.description, food.foodCode, gramsQuantity];

			for (let nutrient of nutrients) {
				// calculate the amount of nutrient in food
				let nutrientAmountPerFood = await getNutrientAmountPerFood(
					nutrient,
					food
				);

				mealTotals[nutrient.id] += nutrientAmountPerFood;
				grandTotals[nutrient.id] += nutrientAmountPerFood;

				newRow.push(nutrientAmountPerFood);
			}

			worksheet.addRow(newRow);
		}

		// add totals of each nutrient for this meal
		worksheet.addRow(
			["Total", "", mealTotals["quantity"]].concat(
				nutrients.map((nutrient) => mealTotals[nutrient.id])
			)
		);

		worksheet.addRow();
	}

	// add totals of each nutrient for this meal
	worksheet.addRow(
		["Grand Total", "", grandTotals["quantity"]].concat(
			nutrients.map((nutrient) => grandTotals[nutrient.id])
		)
	);

	// write macronutrient report if all macronutrients are present
	if (containsAllMacronutrients(nutrients)) {
		writeMacronutrientReport(
			workbook,
			grandTotals[Macronutrients.PROTEIN],
			grandTotals[Macronutrients.FAT],
			grandTotals[Macronutrients.CARBS]
		);
	}

	// save the report as a .xlsx
	workbook.xlsx
		.writeBuffer()
		.then((data) => {
			let blob = new Blob([data]);
			FileSaver.saveAs(blob, "Nutrient Report.xlsx");
			console.log("Generated report.");
		})
		.catch((error) => console.log(error));
};

export default writeNutrientReport;
