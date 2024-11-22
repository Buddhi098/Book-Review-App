import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1A1A1D', 
            light: '#6A1E55', 
            dark: '#1A1A1D', 
        },
        secondary: {
            main: '#A64D79', 
        },
        customColors: { 
            lightest: '#CBDCEB',
            lighter:"#d1a9bd"
        },
    },
    typography: {
        fontFamily: '"Montserrat", sans-serif',
    },
});

export default theme;
