import { alpha, createTheme } from '@mui/material/styles';

function Theme() {
    const lightGreen = '#e1eedd';
    const darkGreen = '#183a1d';
    const orange = '#f0a04b';
    const beige = '#fefbe9';
    const yellow = '#f6c453';

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
