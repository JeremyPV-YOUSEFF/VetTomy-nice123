import { SortProduct } from "../../../../shared/interfaces/product.interface";

export interface SortProductList {
    name: string,
    value : SortProduct
}

export const DataSortProductList : SortProductList[] = [
    {name:'Productos recientes',value:'idDesc'},
    {name:'Precio de menor a mayor',value:'priceAsc'},
    {name:'Precio de mayor a menor',value:'priceDesc'},
    {name:'Productos de A - Z',value:'nameAsc'},
    {name:'Productos de Z - A',value:'nameDesc'},
]
