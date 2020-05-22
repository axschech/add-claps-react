import React, { useState } from 'react'

export const EMOTE = '👏';

export interface Input {
    value?: string,
}

export interface UpdateItems {
    (value: string): void
}

export interface InputProps extends Input {
    placeholder?: string
    updateItems: UpdateItems
}

export const Input = (props:InputProps) => {
    const [value, setValue] = useState(props.value || '');

    return <form onSubmit={(e) => { 
        e.preventDefault();
        props.updateItems(value);
        setValue('')
    }}>
            <div className='form-row align-items-center'>
                <div className='col-sm-10'>
                    <input 
                        type="text" 
                        value={value}
                        placeholder={props.placeholder}
                        className='form-control'
                        onChange={e => setValue(e.target.value)} />
                </div>
                <div className='col'>
                    <button type="submit" className='btn btn-primary btn-block'>{EMOTE}</button>
                </div>
            </div>
        </form>
}