import { Button, Box, Typography } from "@mui/material";
import Excel from "exceljs";
import FileSaver from "file-saver";
import "../App.css";

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
	let nutrientResult = nutrientAmount * food.conversion * food.quantity;
	// Round result to 2 decimal points
	return Math.round((nutrientResult + Number.EPSILON) * 100) / 100;
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
		let worksheet = workbook.addWorksheet("");

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
					newRow.push(nutrientAmountPerFood);
					console.log("Pushed new value, " + nutrientAmountPerFood);
				}

				worksheet.addRow(newRow);
			}

			worksheet.addRow();
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
