import React from 'react'

import { ReactComponent as TwitterLogo } from '../twitter.svg'

const TWEET_URL = 'https://twitter.com/intent/tweet?text=';

export interface TweetProps {
    className?: string
    value:string
    setValue?: () => void
}

export const Tweet = (props:TweetProps) => <button type='button' className={props.className} onClick={
    () => {
        window.open(TWEET_URL + props.value);
        if (props.setValue) {
            props.setValue();
        }
    }}>
        <TwitterLogo className='emoticon-image' />
    </button>