const writeMacronutrientReport = (
    workbook,
    totalProtein,
    totalFat,
    totalCarbs
) => {
    let worksheet = workbook.addWorksheet('Macronutrient Report');

    worksheet.columns = [
        { header: 'Macronutrient Distribution', style: { numFmt: '0.00' } },
        { header: 'Protein', style: { numFmt: '0.00' } },
        { header: 'Fat', style: { numFmt: '0.00' } },
        { header: 'Carbohydrates', style: { numFmt: '0.00' } },
        { header: 'Total', style: { numFmt: '0.00' } }
    ];

    let KCALS_PER_GRAM_PROTEIN = 4;
    let KCALS_PER_GRAM_FAT = 9;
    let KCALS_PER_GRAM_CARBS = 4;

    let kcalProtein = totalProtein * KCALS_PER_GRAM_PROTEIN;
    let kcalFat = totalFat * KCALS_PER_GRAM_FAT;
    let kcalCarbs = totalCarbs * KCALS_PER_GRAM_CARBS;
    let kcalTotal = kcalProtein + kcalFat + kcalCarbs;

    worksheet.addRow([
        'Calculated Energy for Macronutrient Distribution (kCal)',
        kcalProtein,
        kcalFat,
        kcalCarbs,
        kcalTotal
    ]);

    worksheet.addRow([
        'Calculated Energy for Macronutrient Distribution (%)',
        (kcalProtein / kcalTotal) * 100,
        (kcalFat / kcalTotal) * 100,
        (kcalCarbs / kcalTotal) * 100,
        100.0
    ]);
};

export default writeMacronutrientReport;
