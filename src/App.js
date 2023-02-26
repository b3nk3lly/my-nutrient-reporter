import { useState, useReducer } from "react";
import { Divider, Grid } from "@mui/material";
import "./App.css";
import MealController from "./meal/MealController";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import NutrientSelect from "./nutrient/NutrientSelect";
import Theme from "./Theme";
import Header from "./Header";
import Footer from "./Footer";
import mealReducer from "./MealReducer";
import GenerateReportButton from "./report/GenerateReportButton";

function App() {
	const [meals, mealDispatch] = useReducer(mealReducer, [
		{ id: 0, name: "", foods: [] }
	]);

	const [selectedNutrients, setSelectedNutrients] = useState([]);

	return (
		<ThemeProvider theme={Theme()}>
			<CssBaseline />

			<Grid container rowSpacing={1}>
				<Grid item xs={12}>
					<Header />
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item xs={12}>
					<MealController meals={meals} dispatch={mealDispatch} />
				</Grid>
				<Grid item xs={12}>
					<NutrientSelect
						selectedNutrients={selectedNutrients}
						setSelectedNutrients={setSelectedNutrients}
					/>
				</Grid>
				<Grid item xs={12}>
					<GenerateReportButton
						meals={meals}
						nutrients={selectedNutrients}
					/>
				</Grid>
				<Grid item xs={12}>
					<Footer />
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default App;
