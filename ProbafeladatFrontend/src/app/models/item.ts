export interface NewItem {
    name: string;
    type: string;
    price: number;
}

export interface Item extends NewItem{
    id: number;
}
