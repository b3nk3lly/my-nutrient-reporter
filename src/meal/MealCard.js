import { useState } from "react";
import FoodInput from "./FoodInput";
import {
	IconButton,
	TextField,
	Card,
	CardContent,
	CardHeader,
	Collapse,
	Tooltip
} from "@mui/material";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Grid from "@mui/material/Grid";
import FoodList from "./FoodList";
import ReducerActions from "../enums/ReducerActions";

function MealCard({ meal, dispatch, isOnlyMeal }) {
	const [name, setName] = useState(meal.name);
	const [collapsed, setCollapsed] = useState(false);

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	// Update meal name based on user input
	const updateName = (event) => {
		dispatch({
			type: ReducerActions.UPDATE_NAME,
			payload: { meal: meal, name: event.target.value }
		});
	};

	/**
	 * Removes a meal. Prompts the user with a confirmation dialog if the meal contains any food.
	 * Does nothing if this is the only meal.
	 */
	const removeMeal = () => {
		if (
			meal.foods.length === 0 ||
			window.confirm(
				`Are you sure you want to delete ${
					name === "" ? "Untitled Meal" : name
				}?`
			)
		) {
			dispatch({ type: ReducerActions.REMOVE_MEAL, payload: meal });
		}
	};

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	return (
		<Card variant="outlined" sx={{ border: 2, borderRadius: 5 }}>
			<CardHeader
				title={
					<TextField
						id="standard-basic"
						autoComplete="off"
						variant="standard"
						placeholder="Untitled Meal"
						value={name}
						onChange={handleNameChange}
						onBlur={updateName}
						InputProps={{
							style: {
								color: "#183a1d"
							}
						}}
						inputProps={{
							style: {
								color: "#183a1d"
							}
						}}
					/>
				}
				action={
					<div>
						<span disabled={isOnlyMeal}>
							<Tooltip title="Delete Meal">
								<IconButton onClick={removeMeal}>
									<DeleteOutlineIcon />
								</IconButton>
							</Tooltip>
						</span>
						<Tooltip title={collapsed ? "Expand" : "Collapse"}>
							<IconButton onClick={toggleCollapsed}>
								{/* Arrow direction depends on whether card is collapsed */}
								{collapsed ? (
									<KeyboardArrowDownOutlinedIcon />
								) : (
									<KeyboardArrowUpOutlinedIcon />
								)}
							</IconButton>
						</Tooltip>
					</div>
				}
			/>
			<Collapse in={!collapsed}>
				<CardContent>
					<Grid container rowSpacing={2}>
						<Grid item xs={12}>
							{<FoodInput meal={meal} dispatch={dispatch} />}
						</Grid>
						<Grid item xs={12}>
							<FoodList meal={meal} dispatch={dispatch} />
						</Grid>
					</Grid>
				</CardContent>
			</Collapse>
		</Card>
	);
}

export default MealCard;
