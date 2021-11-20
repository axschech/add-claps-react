export interface Storage<T = {}> {
    key: string
    save: (value: T) => void
    get: () => T
}


export class LocalStorage<T> implements Storage<T>{
    key: string

    constructor(key: string) {
        this.key = key;
    }
    save(value: T) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }

    get(): T {
        try {
            return JSON.parse(localStorage.getItem(this.key) || '{}')
        } catch(error) {
            return <T>{};
        }
    }
}

export class ItemStorer extends LocalStorage<ItemStorage> {
    constructor() {
        super(ITEM_STORAGE_KEY)

        const items = this.get().items;

        if (!items) {
            this.save({items: []})
        }
    }
}

export interface ItemStorage {
    items: string[]
}

export const ITEM_STORAGE_KEY = "items";