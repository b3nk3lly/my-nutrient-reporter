import { React, Grid, Typography } from '@mui/material';

function Header() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h1">My Nutrient Reporter</Typography>
                    <Typography variant="subtitle2">
                        Powered by the Canadian Nutrient File API
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Header;
