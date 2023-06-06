import React, {FC, ReactElement, useContext, useEffect} from 'react';
import { Grid, Box, Alert, LinearProgress } from '@mui/material'
import format from 'date-fns/format';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { useQuery, useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';
import { countTask } from './helpers/countTask';
import { TaskStatusChangedContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {
    const taskUpdatedContext = useContext(TaskStatusChangedContext)

    const { error, isLoading, data, refetch } = useQuery(
        ['tasks'], 
        async () => {
            return await sendApiRequest<ITaskApi[]>(
                'https://localhost:3200/tasks',
                'GET',
            );
        },
    );

    // update task mudation
    const updateTasMutation = useMutation(
        (data: IUpdateTask) => sendApiRequest(
            `https://localhost:3200/tasks`,
            'PUT',
            data,
        ),
    );

    useEffect(() => {
        refetch();
    }, [taskUpdatedContext.updated])

    useEffect(() => {
        if(updateTasMutation.isSuccess) {
            taskUpdatedContext.toggle();
        }
    }, [updateTasMutation.isSuccess])

    function onStatusChangeHandler (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string,
    ) {
        updateTasMutation.mutate({
            id, 
            status: e.target.checked ? Status.inProgress : Status.todo
        })
    }

    // mark complete
    function markCompleteHandler (
        e: 
            |React.MouseEvent<HTMLButtonElement> 
            | React.MouseEvent<HTMLAnchorElement>, 
        id: string
    ){
        updateTasMutation.mutate({
            id,
            status: Status.completed,
        })
    }

    return (
        <Grid item md={8} px={4}>
            <Box mb={8} px={4}>
                <h2>Status Of Your Task As On{' '}
                    { format(new Date(), 'PPPP') }
                </h2>
            </Box>
            <Grid
                container
                display='flex'
                justifyContent='center'
            >
                <Grid
                    item
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-around'
                    alignItems='center'
                    md={10}
                    xs={12}
                    mb={8}
                >
                    <TaskCounter status={Status.todo} count={data ? countTask(data, Status.todo) : 0}/>

                    <TaskCounter status={Status.inProgress} count={data ? countTask(data, Status.inProgress) : 0}/>
                    
                    <TaskCounter status={Status.completed} count={data ? countTask(data, Status.completed) : 0}/>
                </Grid>
                <Grid
                    item
                    display='flex'
                    flexDirection='column'
                    md={8}
                    xs={10}
                >
                    {!error && Array.isArray(data) && data.length === 0 && (
                        <Alert severity='warning'>
                            You do not have any tasks greated yet. Start by creating some tasks
                        </Alert>
                    )}
                    {
                        isLoading ? <LinearProgress /> :
                            Array.isArray(data) && data.length > 0 && data.map((each, index) => {
                                    return each.status === Status.todo || each.status === Status.inProgress ? (
                                        <Task 
                                            key={index} 
                                            id={each.id} 
                                            title={each.title} 
                                            date={new Date(each.date)} 
                                            priority={each.priority} 
                                            status={each.status} 
                                            description={each.description}
                                            onClick={markCompleteHandler}
                                            onStatusChange={ onStatusChangeHandler}
                                        />
                                    ) : null
                                }
                            )
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}