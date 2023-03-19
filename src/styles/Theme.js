import { alpha, createTheme } from '@mui/material/styles';
import Colors from '../enums/Colors';

function Theme() {
    return createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: Colors.DARK_GREEN,
                        borderColor: 'black',
                        borderRadius: 5
                    }
                }
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        color: Colors.DARK_GREEN,
                        border: Colors.DARK_GREEN
                    }
                }
            },
            MuiCardHeader: {
                styleOverrides: {
                    root: {
                        background: alpha(Colors.DARK_GREEN, 0.08)
                    }
                }
            }
        },
        palette: {
            background: {
                paper: Colors.PALE_GREEN
            }
        },
        typography: {
            h1: {
                fontFamily: 'sans-serif',
                textAlign: 'center',
                color: Colors.MAGENTA,
                fontSize: '3rem'
            },
            subtitle2: {
                fontFamily: 'sans-serif',
                textAlign: 'center',
                color: Colors.MAGENTA
            },
            body1: {
                color: 'black'
            }
        }
    });
}

export default Theme;
