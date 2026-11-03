export interface Category {
    id: number;
    categoryId : number;
    name: string;
    state:boolean
}

export interface CategoryShort {
    name : string
}

export class CategoryParams {
    CurrentPage : number = 1;
    PageSize    : number = 10;
    categoryId  : number = 0;
    Sort        : string = '';
    Search      : string = '';
    State       : boolean = true
    Exclude     : string = 'Sin categoria'
}