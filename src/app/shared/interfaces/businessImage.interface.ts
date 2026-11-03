export interface BusinessImage {
    id: number,
    name: string,
    url: string
    type: string,
    state : boolean
}

export interface ShortBusinessImage{
    url : string
}

/* export enum TypeBusinessImage {
    Home    = 'Home',
    Service = 'Service',
    Review   = 'Review'
}
 */
export type TypeBusinessImage = 'Home'|'Service'|'Review'