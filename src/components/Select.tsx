import React from 'react';

export interface SelectProps{
    element: any
}

export const Select = (props:SelectProps) => {
    const select = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const selection = window.getSelection(),
            range = document.createRange();

            e.preventDefault();

            range.selectNodeContents(props.element.current.childNodes[0]);
            selection?.removeAllRanges();
            selection?.addRange(range);
            document.execCommand('copy');
    }
    return <button type='button'  className='btn btn-primary btn-block' onClick={select}>
        <span role='img' aria-label='copy'>
        ✂️
        </span>
    </button>
}