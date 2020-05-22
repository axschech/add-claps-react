import React from "react"

export interface ListItemsProps {
    items: string[]
}

export const ListItems = (props: ListItemsProps) => {
    const itemsElements = props.items.map((item, i) => {
        return <div key={i} className='clapText'>{item}</div>
    })

    return <section>{itemsElements}</section>
}
