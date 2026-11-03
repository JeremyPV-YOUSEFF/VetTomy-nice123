export interface BranchData {
    id : number,
    location : string,
    state : boolean
}

export class BranchParams 
{
    CurrentPage : number = 1;
    PageSize    : number = 4;
    State       : boolean = true
    Type        : TypeBranch = ''
}

export type TypeBranch = 'Tienda' |'Centro Veterinario'|''