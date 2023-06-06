import React, {FC, ReactElement} from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { ISelectField } from './interfaces/ISelectField';

export const TaskSelectField: FC<ISelectField> = (props): ReactElement => {
    const { 
        value = '',
        label = 'Select Box',
        name = 'selectBox',
        items = [{ value: '', label: 'Add items'}],
        disabled = false,
        onChange = (e: SelectChangeEvent) => console.log(e)
    } = props

    return (
        <FormControl fullWidth size='small'>
            <InputLabel id={`${name}`}>{label}</InputLabel>
            <Select
                labelId={`${name}-id`}
                id={`${name}-id-select`}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                {
                    items.map((item, index) => <MenuItem key={index} value={item.value}>{item.label}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}