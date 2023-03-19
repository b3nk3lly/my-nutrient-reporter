import React from 'react';
import { Box, Typography } from '@mui/material';

function SectionHeader({ renderHeader, helperText }) {
    return (
        <Box
            margin={(1, 0.7, 3, 0.7)}
            sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            {renderHeader()}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                    alignItems: 'flex-end'
                }}
            >
                <Typography variant="subtitle1" justifyContent="end">
                    {helperText}
                </Typography>
            </Box>
        </Box>
    );
}

export default SectionHeader;
