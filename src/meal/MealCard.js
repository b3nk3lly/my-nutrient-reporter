import { useState } from "react";
import FoodInput from "./FoodInput";
import {
	IconButton,
	TextField,
	Card,
	CardContent,
	CardHeader,
	Collapse
} from "@mui/material";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Grid from "@mui/material/Grid";
import FoodList from "./FoodList";
import REDUCER_ACTIONS from "../ReducerActions";

function MealCard({ meal, dispatch }) {
	const [name, setName] = useState(meal.name);
	const [collapsed, setCollapsed] = useState(false);

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	// Update meal name based on user input
	const updateName = (event) => {
		console.log("Setting meal name to " + event.target.value);
		dispatch({
			type: REDUCER_ACTIONS.UPDATE_NAME,
			payload: { meal: meal, name: event.target.value }
		});
	};

	// Remove this meal from the list
	const removeMeal = () => {
		dispatch({ type: REDUCER_ACTIONS.REMOVE_MEAL, payload: meal });
	};

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	return (
		<Card variant="outlined" style={{ borderColor: "#e1eedd" }}>
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
						<IconButton onClick={removeMeal}>
							<DeleteOutlineIcon />
						</IconButton>
						<IconButton onClick={toggleCollapsed}>
							{/* Arrow direction depends on whether card is collapsed */}
							{collapsed ? (
								<KeyboardArrowDownOutlinedIcon />
							) : (
								<KeyboardArrowUpOutlinedIcon />
							)}
						</IconButton>
					</div>
				}
				style={{ backgroundColor: "#e1eedd" }}
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
