
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

# My Nutrient Reporter

This app is meant to provide a simple, convenient way of tracking nutritional intake. Tell it what food you ate, how much you ate, and what nutrients you're interested in tracking, and it will generate an Excel workbook containing a breakdown of the nutrients in your food.

The data used by this app comes from the [Canadian Nutrient File API](https://produits-sante.canada.ca/api/documentation/cnf-documentation-en.html) from Health Canada. The API provides nutritional data on a wide variety of foods. Based on what food you enter, this app uses the API to calculate how much of a given set of nutrients is in your food.

## Installation

To install this project, first clone it:

```bash
  git clone https://github.com/b3nk3lly/my-nutrient-reporter.git
```

Next, navigate to the project directory:

```bash
  cd my-nutrient-reporter
```

Finally, install dependencies and run the app:

```bash
  npm install --save
  npm start
```
    
## Usage

There are two sections of the app: Meals and Nutrients. The Meals section is for entering the food that you ate and the Nutrients section is for entering the nutrients you want to track.

You are able to divide the food you ate into meals. Each meal can be named.

To enter a food, select one from the dropdown menu inside a meal. Food can be searched by name or by CNF food code. After selecting a food, select a unit of measurement and the quantity that you ate. 

The units of measurement available to select depend on the food. For example, if you select the food "Egg, chicken, whole, cooked, scrambled or omelet", you will be able to choose "large egg", "small egg", "grams", or "millilitres" as a unit of measurement. The unit "grams" is available for all foods.

Here is an example of what a filled-out meal might look like:

![image](https://user-images.githubusercontent.com/76674774/226212503-efd010ff-7e32-4304-b41e-d3e0bcabd227.png)

To choose the nutrients you want to track, select them from the dropdown in the Nutrients section. You can filter down this list by typing in a nutrient's name. By default, the macronutrients "Protein", "Carbohydrates", and "Total Fat" are selected. If you generate a report with these selected, a "Macronutrient Breakdown" sheet will be included in the report. This sheet provides the number of kilocalories of macronutrients you consumed as well as the percentages of which macronutrients make up your total macronutrient intake.

After you have filled in your meals and nutrients, click "Generate Report" to download your report.

See here for a sample report: [Sample Nutrient Report.xlsx](https://github.com/b3nk3lly/my-nutrient-reporter/files/11012503/Sample.Nutrient.Report.xlsx)
