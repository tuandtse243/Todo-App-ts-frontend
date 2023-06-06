import React, {FC, ReactElement} from 'react';
import { Box, Button, Switch, FormControlLabel } from '@mui/material';
import { ITaskFooter } from './interfaces/ITaskFooter';
import { Status } from '../createTaskForm/enums/Status';

export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
    const {
        id,
        status,
        onStatusChange = (e) => console.log(e),
        onClick = (e) => console.log(e)
    } = props;

    return (    
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            mt={4}
        >
            <FormControlLabel 
                control={<Switch color='warning' onChange={(e) => onStatusChange(e, id)}/>} 
                label="In Progress"
                defaultChecked={status === Status.inProgress}
            />
            <Button
                variant="contained"
                color='success'
                size='small'
                sx={{
                    color: 'white',
                    fontWeight: 'bold',
                }}
                onClick={(e) => onClick(e, id)}
            >Mark Complete</Button>
        </Box>
    )
}