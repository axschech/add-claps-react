import React from 'react'

export interface HeaderProps{
    text: string
}

export const Header = (props:HeaderProps) => 
    <header className="jumbotron text-center">
        <h1>
            {props.text}
        </h1>
    </header>