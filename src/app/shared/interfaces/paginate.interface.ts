export interface Paginate<T> {
    data        : T[] ,
    currentPage : number,
    pageSize    : number,
    totalItems  : number,
    totalPages  : number
}

export interface PaginateData {
    data        : [] | any ,
    currentPage : number,
    pageSize    : number,
    totalItems  : number,
    totalPages  : number
}