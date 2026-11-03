export interface AddressData {
    id: number,
    department: string,
    region: string,
    district: string,
    street: string,
    reference: string,
    streetNumber: string,
    personId: number
}

export interface Address {
    department: string,
    region: string,
    district: string,
    street: string,
    reference: string,
    streetNumber: string,
    personId: number,
    codeAddress  :string
}

export class AddressParams {
    CurrentPage : number = 1;
    PageSize    : number = 10;
    State       : boolean = true
    PersonId    : number = 0
    Sort        : string = 'idDesc'
}

export interface AddressCombine {
    department: string,
    region: string,
    district: string,
    street: string,
    reference: string,
    streetNumber: string,
    personId: number
    idAddress : number
}