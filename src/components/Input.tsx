import React, { useState, useRef, useEffect } from 'react'
import { Tweet } from './Tweet';

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

interface TextFocus {
    focus: () => void
}

export const Input = (props:InputProps) => {
    let textInput:TextFocus | null = null;
    
    useEffect(() => {
        textInput?.focus();
    }, [])

    const [value, setValue] = useState(props.value || ''),
        addClaps = (input:string) => {
            const strippedValue = input.trim().replace(
                new RegExp('[ ]', 'g'), ' ' + EMOTE + ' '
            );

            return `${strippedValue} ${EMOTE}`
        },
        passClaps = () => {
            const withClaps = addClaps(value);
        
            props.updateItems(withClaps);
            setValue('');
        }
    return <form onSubmit={(e) => { 
        e.preventDefault();
        
        props.updateItems(addClaps(value));
        setValue('')
    }}>
            <div className='form-row align-items-center mb-3'>
                <div className='col-sm-8'>
                    <input 
                        type="text" 
                        value={value}
                        placeholder={props.placeholder}
                        className='form-control'
                        onChange={e => setValue(e.target.value)}
                        ref={(b) => { textInput = b;}} />
                </div>
                <div className='col'>
                    <button type="submit" className='btn btn-primary btn-block'>{EMOTE}</button>
                </div>
                <div className='col'>
                    <Tweet className={'btn btn-primary btn-block'} value={value} setValue={passClaps} /> 
                </div>
            </div>
        </form>
}