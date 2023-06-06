import React, {FC, ReactElement} from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { ITaskCounter } from './interfaces/ITaskCounter';
import { Status } from '../createTaskForm/enums/Status';
import { emitCorrectBorderColor } from './helpers/emitCorrectBorderColor';
import { emitCorrectLabel } from './helpers/emitCorrectLabel';

export const TaskCounter: FC<ITaskCounter> = (props): ReactElement => {
    const { count = 0, status = Status.completed } = props;

    return(
        <>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
                <Avatar
                    sx={{
                        bgcolor: 'transparent',
                        border: '5px solid',
                        width: '96px',
                        height: '96px',
                        marginBottom: '16px',
                        borderColor: `${emitCorrectBorderColor(status)}`,
                    }}
                >
                    <Typography color='#ffffff' variant='h4'>{count}</Typography>
                </Avatar>
                <Typography
                    color='#ffffff'
                    fontWeight={'bold'}
                    fontSize={'20px'}
                    variant='h5'
                >
                    {emitCorrectLabel(status)}
                </Typography>
            </Box>
        </>
    )
}