import { Button } from "@mui/material";
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
	const generateReport = async () => {
		let workbook = new Excel.Workbook();
		let worksheet = workbook.addWorksheet("");

		let headers = [
			{ header: "Food" },
			{ header: "Food Code" },
			{ header: "Quantity" }
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
				let newRow = [food.description, food.foodCode, food.quantity];

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
		<Button onClick={generateReport} className="Button">
			Generate Report
		</Button>
	);
}

export default ReportGenerator;
