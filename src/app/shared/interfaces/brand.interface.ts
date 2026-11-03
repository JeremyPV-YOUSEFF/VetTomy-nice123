export interface Brand {
    id    : number;
    name  : string;
    state : boolean;
}

export interface BrandShort {
    name : string
}

export class BrandParams {
    CurrentPage : number = 1;
    PageSize    : number = 10;
    Sort        : string = '';
    Search      : string = '';
    State       : boolean = true
    Exclude     : string = 'Sin marca'
}