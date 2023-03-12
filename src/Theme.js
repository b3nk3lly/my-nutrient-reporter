import { alpha, createTheme } from '@mui/material/styles';

function Theme() {
    const darkGreen = '#183a1d';

    return createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: darkGreen,
                        borderColor: 'black',
                        borderRadius: 5
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
            },
            MuiCardHeader: {
                styleOverrides: {
                    root: {
                        background: alpha(darkGreen, 0.08)
                    }
                }
            }
        },
        palette: {
            background: {
                paper: '#eef7d4'
            }
        },
        typography: {
            h1: {
                fontFamily: 'sans-serif',
                textAlign: 'center',
                color: '#fb6f92',
                fontSize: '4rem'
            },
            body1: {
                color: 'black'
            }
        }
    });
}

export default Theme;
