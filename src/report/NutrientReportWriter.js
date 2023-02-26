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
					Math.round((nutrientAmountPerFood + Number.EPSILON) * 100) /
						100
				);

				console.log("Pushed new value, " + nutrientAmountPerFood);
			}

			worksheet.addRow(newRow);
		}

		worksheet.addRow();
	}

	if (containsAllMacronutrients(nutrients)) {
		writeMacronutrientReport(workbook, totalProtein, totalFat, totalCarbs);
	}

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
