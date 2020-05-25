import React, { useRef } from "react"
import { Select } from "./Select";
import { Tweet } from "./Tweet";

export interface ListItemProps {
    item: string
}

export const ListItem = (props:ListItemProps) => {
    const rawElement = useRef(null)

    return <div className='clapText' ref={rawElement}>
        <div className='form-row align-items-center'>
            <span className='col-sm-8'>{props.item}</span>
            <span className='col'><Select element={rawElement} /></span>
            <span className='col'><Tweet value={props.item} className={'btn btn-primary btn-block'} /></span>
        </div>
    </div>
};

export interface ListItemsProps {
    items: string[]
}

export const ListItems = (props: ListItemsProps) => {
    const length = props.items.length;

    const itemsElements = props.items.map((item, i) => {
        return <div key={i}>
             {length > 0 && i!== 0 && i !== length && <hr />}
            <ListItem item={item} />
        </div>;
    })

    return <section>{itemsElements}</section>
}
