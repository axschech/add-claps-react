import React, { useRef } from "react"
import { Select } from "./Select";
import { Tweet } from "./Tweet";

export interface ListItemProps {
    item: string
}

export const ListItem = (props:ListItemProps) => {
    const rawElement = useRef(null)

    return <div className='clapText' ref={rawElement}>
        <span className='p-3'>{props.item}</span>
        <span className='p-3'><Select element={rawElement} /></span>
        <span className='p-3'><Tweet value={props.item} className={'btn btn-primary'} /></span>
    </div>
};

export interface ListItemsProps {
    items: string[]
}

export const ListItems = (props: ListItemsProps) => {
    const itemsElements = props.items.map((item, i) => {
        return <ListItem item={item} key={i} />
    })

    return <section>{itemsElements}</section>
}
