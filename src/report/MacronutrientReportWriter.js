const writeMacronutrientReport = (
    workbook,
    totalProtein,
    totalFat,
    totalCarbs
) => {
    const worksheet = workbook.addWorksheet('Macronutrient Report');

    worksheet.columns = [
        { header: 'Macronutrient Distribution', style: { numFmt: '0.00' } },
        { header: 'Protein', style: { numFmt: '0.00' } },
        { header: 'Fat', style: { numFmt: '0.00' } },
        { header: 'Carbohydrates', style: { numFmt: '0.00' } },
        { header: 'Total', style: { numFmt: '0.00' } }
    ];

    const KCALS_PER_GRAM_PROTEIN = 4;
    const KCALS_PER_GRAM_FAT = 9;
    const KCALS_PER_GRAM_CARBS = 4;

    const kcalProtein = totalProtein * KCALS_PER_GRAM_PROTEIN;
    const kcalFat = totalFat * KCALS_PER_GRAM_FAT;
    const kcalCarbs = totalCarbs * KCALS_PER_GRAM_CARBS;
    const kcalTotal = kcalProtein + kcalFat + kcalCarbs;

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
