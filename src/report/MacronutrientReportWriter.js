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

export default writeMacronutrientReport;
