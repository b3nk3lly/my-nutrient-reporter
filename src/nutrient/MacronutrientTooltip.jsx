import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grow, IconButton } from '@mui/material';

function MacronutrientTooltip() {
    return (
        <Tooltip
            title="Select Protein, Carbohydrate, and Total Fat to have a section for macronutrient percentages included in your report."
            TransitionComponent={Grow}
            enterTouchDelay={0}
            leaveTouchDelay={5000}
        >
            <IconButton size="small" disableRipple>
                <InfoOutlinedIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    );
}

export default MacronutrientTooltip;
