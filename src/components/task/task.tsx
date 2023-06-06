import { Box } from '@mui/material';
import React, {FC, ReactElement} from 'react';
import { TaskHeader } from './_taskHeader';
import { TaskDescription } from './_taskDescription';
import { TaskFooter } from './_taskFooter';
import { ITask } from './interfaces/ITask';
import { Status } from '../createTaskForm/enums/Status';
import { Priority } from '../createTaskForm/enums/Priority';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';

export const Task: FC<ITask> = (props): ReactElement => {
    const { 
        id,
        title = 'Test Title', 
        date = new Date(),
        description = 'Lorem ipsum dolor sit amet',  
        priority = Priority.high, 
        status = Status.completed,
        onClick = (e) => console.log(e), 
        onStatusChange = (e) => console.log(e)
    } = props

    return (
        <Box
            display={'flex'}
            justifyContent={'flex-start'}
            width={'100%'}
            flexDirection={'column'}
            mb={4}
            p={2}
            sx={
                {
                    border: '1px solid',
                    borderRadius: '4px',
                    width: '100%',
                    backgroundColor: 'background.paper',
                    borderColor: renderPriorityBorderColor(priority),
                }
            }
        >
            <TaskHeader title={title} date={date}/>
            <TaskDescription description={description}/>
            <TaskFooter id={id} status={status} onClick={onClick} onStatusChange={onStatusChange}/>
        </Box>
    );
}