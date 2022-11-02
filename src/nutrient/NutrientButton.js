import { Button } from "@mui/material";

function NutrientButton({ nutrient, nutrients, setNutrients }) {
	const unselectedStyle = {
		color: "#183a1d",
		backgroundColor: "#fefbe9",
		borderColor: "#183a1d"
	};

	const selectedStyle = {
		color: "#fefbe9",
		backgroundColor: "#183a1d",
		borderColor: "#183a1d"
	};

	const handleClick = (event) => {
		setNutrients(
			nutrients.map((_nutrient) => {
				if (_nutrient.id == event.target.value) {
					return { ..._nutrient, selected: !_nutrient.selected };
				}

				return _nutrient;
			})
		);
	};

	return (
		<Button
			size="small"
			value={nutrient.id}
			style={{
				borderColor: "black",
				borderRadius: 4
			}}
			variant={nutrient.selected ? "contained" : "outlined"}
			onClick={handleClick}
			sx={nutrient.selected ? selectedStyle : unselectedStyle}
		>
			{nutrient.name}
		</Button>
	);
}

export default NutrientButton;
