import React from 'react';

export interface SelectProps{
    element: any
}

export const Select = (props:any) => {
    const select = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const selection = window.getSelection(),
            range = document.createRange();

            e.preventDefault();

            range.selectNodeContents(props.element.current.childNodes[0]);
            selection?.removeAllRanges();
            selection?.addRange(range);
            document.execCommand('copy');
    }
    return <a href="/" onClick={select}>copy</a>
}