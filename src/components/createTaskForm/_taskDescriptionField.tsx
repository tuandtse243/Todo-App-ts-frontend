import React, {FC, ReactElement} from 'react';
import { TextField } from '@mui/material';
import { ITextField } from './interfaces/ITextField';

export const TaskDescriptionField: FC<ITextField> = (props): ReactElement => {
    const { 
        onChange = (e) => console.log(e), 
        disabled = false 
    } = props
    return(
        <TextField 
            id='description'
            label='Description'
            variant='outlined'
            placeholder='Description'
            size='small'
            name='description'
            rows={4}
            multiline
            fullWidth
            onChange={onChange}
            disabled={disabled}
        />
    )
}