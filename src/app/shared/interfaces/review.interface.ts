export interface Review {
    id: number,
    comment: string,
    state: boolean,
    customerName: string,
    customerId: number,
    bannerUrl: string,
    email: string,
    overallRating: number,
    productRating: number,
    creationDate: Date,
    modificationDate: Date
}

export interface ReviewData {
    comment:        string,
    state:          boolean,
    overallRating:  number,
    productRating:  number,
    productId:      number,
    customerId:     number
}

export class ReviewDataClass {
    comment:        string  = '' ;
    state:          boolean = true;
    overallRating:  number  = 0;
    productRating:  number  = 0;
    productId:      number  = 0;
    customerId:     number  = 0
}

export class ReviewParams {
    ProductId : number = 0
    CurrentPage : number = 1
    PageSize : number = 10
    Sort : sortReview = ''
    Search : string = ''
    OverallRating : number | null = null 
    ProductRating : number | null = null
    State : boolean = true
}

export type sortReview = 'dateAsc'|'dateDesc'|'productRatingAsc'|'productRatingDesc'|'ratingAsc'|'ratingDesc'|'idDesc'|''