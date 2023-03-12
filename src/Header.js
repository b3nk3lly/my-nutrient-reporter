import { React, Grid, Typography } from '@mui/material';

function Header() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h1">My Nutrient Reporter</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Header;
