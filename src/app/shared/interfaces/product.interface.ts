import { Image } from "./image.interface";

export interface ProductData {
    id                  : number,
    name                : string,
    type                : string,
    description         : string,
    discount            : number,
    expirationDate      : Date,
    creationDate        : Date,
    modificationDate    : Date,
    weight              : number,
    dimensions          : string,
    relevance           : string,
    price               : number,
    basePrice           : number,
    priceWithDiscount   : number,
    stock               : number,
    state               : string,
    brandName           : string,
    categoryName        : string,
    image               : Image[] ,
    typePet             : string,
    activities          : string,
    observations        : string,
    requirements        : string,
}

export class ProductParams {
    Relevance   : RelevanceProduct = ''; 
    CurrentPage : number = 1; 
    PageSize    : number = 12; 
    Sort        : SortProduct = ''; 
    Type        : TypeProduct = ''; 
    Search      : string = ''; 
    TypePet     : string[] = []; 
    Category    : string[] = []; 
    Brands      : string[] = []; 
    State       :boolean = true;
}

export type SortProduct = 'priceAsc'|'priceDesc'|'nameAsc'|'nameDesc'|'idDesc'|''
export type TypeProduct = 'Producto' | 'Servicio' | ''
export type RelevanceProduct = 'HomePage' | 'StorePage' | ''

export interface ProductItemCart {
    product  : ProductData,
    quantity : number ,
}   


export class ProductItemCartClass {
    product  ?: ProductData 
    quantity : number = 1 
}   

export interface CartTotal {
    subTotal : number
    total : number
    deliveryPrice : number
    address : ''
    addressId : number
}