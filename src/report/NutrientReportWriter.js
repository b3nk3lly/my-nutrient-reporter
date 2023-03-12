import Excel from 'exceljs';
import FileSaver from 'file-saver';
import Macronutrients from '../enums/Macronutrients';
import writeMacronutrientReport from './MacronutrientReportWriter';

const nutrientAmountUri =
    'https://food-nutrition.canada.ca/api/canadian-nutrient-file/nutrientamount/?lang=en&id=';

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
    const response = await fetch(nutrientAmountUri + food.foodCode);
    const json = await response.json();

    // get the nutrient with id that matches the one we're looking for
    const relevantResult = json.find(
        (result) => result['nutrient_name_id'] === nutrient.id
    );

    const nutrientAmount = relevantResult
        ? relevantResult['nutrient_value']
        : 0;

    // calculate amount of the nutrient per food
    return nutrientAmount * food.conversion * food.quantity;
};

const writeNutrientReport = async (meals, nutrients) => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Nutrient Report');

    const headers = [
        { header: 'Food' },
        { header: 'Food Code' },
        { header: 'Quantity (g)', style: { numFmt: '0.00' } }
    ];

    for (const nutrient of nutrients) {
        headers.push({
            header: nutrient.name + ' (' + nutrient.unit + ') ',
            style: { numFmt: '0.00' }
        });
    }

    worksheet.columns = headers;

    const grandTotals = {};
    grandTotals['quantity'] = 0;
    nutrients.forEach((nutrient) => (grandTotals[nutrient.id] = 0));

    for (const meal of meals) {
        const mealTotals = {};
        mealTotals['quantity'] = 0;
        nutrients.forEach((nutrient) => (mealTotals[nutrient.id] = 0));

        worksheet.addRow([meal.name]);

        for (const food of meal.foods) {
            // calculate quantity in grams
            const gramsQuantity = food.quantity * food.conversion * 100;

            mealTotals['quantity'] += gramsQuantity;
            grandTotals['quantity'] += gramsQuantity;

            const newRow = [food.description, food.foodCode, gramsQuantity];

            for (const nutrient of nutrients) {
                // calculate the amount of nutrient in food
                const nutrientAmountPerFood = await getNutrientAmountPerFood(
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
            ['Total', '', mealTotals['quantity']].concat(
                nutrients.map((nutrient) => mealTotals[nutrient.id])
            )
        );

        worksheet.addRow();
    }

    // add totals of each nutrient for this meal
    worksheet.addRow(
        ['Grand Total', '', grandTotals['quantity']].concat(
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
            const blob = new Blob([data]);
            FileSaver.saveAs(blob, 'Nutrient Report.xlsx');
        })
        .catch((error) => console.log(error));
};

export default writeNutrientReport;
