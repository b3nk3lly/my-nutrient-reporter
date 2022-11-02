import { createTheme } from "@mui/material/styles";

function Theme() {
	const lightGreen = "#e1eedd";
	const darkGreen = "#183a1d";
	const orange = "#f0a04b";
	const beige = "#fefbe9";
	const yellow = "#f6c453";

	return createTheme({
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						color: darkGreen
					}
				}
			},
			MuiInput: {
				styleOverrides: {
					root: {
						color: darkGreen,
						border: darkGreen
					}
				}
			}
		},
		palette: {
			background: {
				default: beige,
				paper: beige
			}
		},
		typography: {
			body1: {
				color: darkGreen
			}
		}
	});
}

export default Theme;
