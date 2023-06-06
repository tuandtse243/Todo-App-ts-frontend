import { Box, Typography, Stack, LinearProgress, Button, AlertTitle, Alert } from "@mui/material";
import React, { FC, ReactElement, useEffect, useState, useContext } from "react";
import { TaskTitleField } from "./_taskTitleField";
import { TaskDescriptionField } from "./_taskDescriptionField";
import { TaskDateField } from "./_taskDateField";
import { TaskSelectField } from "./_taskSelectField";
import { Status } from "./enums/Status";
import { Priority } from "./enums/Priority";
import { useMutation } from "@tanstack/react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { ICreateTask } from "../taskArea/interfaces/ICreateTask";
import { TaskStatusChangedContext } from "../../context/TaskStatusChangedContext/TaskStatusChangedContext";

export const CreateTaskForm: FC = (): ReactElement => {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<Date | null>(new Date());
    const [status, setStatus] = useState<string>(Status.todo);
    const [priority, setPriority] = useState<string>(Priority.normal);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const tasksUpdatedContext = useContext(TaskStatusChangedContext);

    // Create task mutation
    const createTaskMutation = useMutation(async (data: ICreateTask) => {
        sendApiRequest(
            'https://localhost:3200/tasks',
            'POST',
            data,
        )
    })

    function createTaskHandler() {
        if(!title || !date || !description) {
            return;
        }

        const task: ICreateTask = {
            title,
            description,
            date: date.toString(),
            status,
            priority,
        };

        createTaskMutation.mutate(task);
    }

    useEffect(() => {
        if(createTaskMutation.isSuccess) {
            setShowSuccess(true);
            tasksUpdatedContext.toggle();
        }
        const successTimeout = setTimeout(() => {
            setShowSuccess(false);
        }, 4000)
        return () => {
            clearTimeout(successTimeout);
        }
    }, [createTaskMutation.isSuccess])

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
            width='100%'
            px={4}
            my={6}
        >
            {showSuccess && (
                <Alert
                    severity="success"
                    sx={{ width: '100%', marginBottom: '16px' }}
                >
                    <AlertTitle>Success</AlertTitle>
                    The task has been created successfully
                </Alert>
            )}
            <Typography mb={2} component='h2' variant="h6">Create A Task</Typography>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <TaskTitleField 
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={createTaskMutation.isLoading}
                />
                <TaskDescriptionField 
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={createTaskMutation.isLoading}
                />
                <TaskDateField
                    value={date}
                    onChange={(date) => setDate(date)}
                    disabled={createTaskMutation.isLoading}
                />
                <Stack sx={{ width: '100%' }} direction={'row'} spacing={2}>
                    <TaskSelectField 
                        label="Status" 
                        name="status" 
                        items={[
                        {
                            value: Status.todo,
                            label: Status.todo.toUpperCase(),
                        },
                        {
                            value: Status.inProgress,
                            label: Status.inProgress.toUpperCase(),
                        },
                        ]}
                        onChange={(e) => setStatus(e.target.value as string)}
                        disabled={createTaskMutation.isLoading}
                    />
                    <TaskSelectField 
                        label="Priority" 
                        name="priority" 
                        items={[
                        {
                            value: Priority.low,
                            label: Priority.low.toUpperCase(),
                        },
                        {
                            value: Priority.normal,
                            label: Priority.normal.toUpperCase(),
                        },
                        {
                            value: Priority.high,
                            label: Priority.high.toUpperCase(),
                        },
                        ]}
                        onChange={(e) => setPriority(e.target.value as string)}
                        disabled={createTaskMutation.isLoading}
                    />
                    
                </Stack>
                {createTaskMutation.isLoading && <LinearProgress />}
                <Button
                    disabled={
                        !title ||
                        !date ||
                        !description ||
                        !status ||
                        !priority 
                    }
                    variant="contained" size="large" fullWidth onClick={createTaskHandler}>Create a Task</Button>
            </Stack>
        </Box>
    )
}