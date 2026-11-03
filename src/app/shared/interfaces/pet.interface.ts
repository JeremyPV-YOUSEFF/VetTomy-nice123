export interface PetData {
    id              : number
    name            : string
    color           : string
    gender          : string
    typeOfPet       : string
    creationDate    : string
    image           : string
    birthday        : string
    state           : boolean
    breedName       : string
    customerName    : string
}

export class PetParams {
    CurrentPage : number = 1;
    PageSize    : number = 10;
    State       : boolean = true;
    CustomerId  : number = 0;
    Sort        : PetSort = 'idDesc';
}

export type PetSort = ''|'idDesc'