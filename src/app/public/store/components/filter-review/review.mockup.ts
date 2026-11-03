import { sortReview } from "../../../../shared/interfaces/review.interface";

export interface listSortReview {
    name:string;
    sort : sortReview;
}

export const dataListSortReview : listSortReview[] = [
    {name:'Mas reciente',sort:'dateDesc'},
    {name:'Mas antiguo',sort:'dateAsc'},
    {name:'De menor a mayor calificaciòn',sort:'productRatingAsc'},
    {name:'De mayor a menor calificaciòn',sort:'productRatingDesc'},
]