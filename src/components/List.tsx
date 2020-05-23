import React, { useRef } from "react"
import { Select } from "./Select";

export interface ListItemProps {
    item: string
}

export const ListItem = (props:ListItemProps) => {
    const rawElement = useRef(null)

    return <div className='clapText' ref={rawElement}>{props.item} 
        <Select element={rawElement} />
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
