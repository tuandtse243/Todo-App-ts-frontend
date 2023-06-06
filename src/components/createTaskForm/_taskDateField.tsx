import React, {FC, ReactElement } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IDateField } from './interfaces/IDateField';


export const TaskDateField: FC<IDateField> = (props): ReactElement => {

    const { 
        value = new Date(), 
        disabled = false, 
        onChange = (date) => console.log(date), 
    } = props

    return (
        <>
            <LocalizationProvider
                dateAdapter={AdapterDateFns}
            >
                <DesktopDatePicker
                    label="Task Date"
                    format='dd/MM/yyyy'
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            </LocalizationProvider>
        </>
    )
}