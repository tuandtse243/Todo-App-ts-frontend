import React, {FC, ReactElement} from 'react';
import { Typography, Box } from '@mui/material';
import { ITaskDescription } from './interfaces/ITaskDescription';

export const TaskDescription: FC<ITaskDescription> = (props): ReactElement => {
    const { description = 'Lorem ispum dolor sit amet' } = props;
    return (
        <Box>
            <Typography>{description}</Typography>
        </Box>
    )
}