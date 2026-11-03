import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginate } from '../interfaces/paginate.interface';
import { Review, ReviewData, ReviewParams } from '../interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = environment.baseUrl
  private service = 'store/reviews'

  constructor(private htpp: HttpClient) { }

  getReviewns(queyParams : ReviewParams):Observable<Paginate<Review>>{
    let params = new HttpParams()
      .set('CurrentPage',queyParams.CurrentPage)
      .set('PageSize',queyParams.PageSize)
      .set('Sort',queyParams.Sort)
      .set('Search',queyParams.Search)
      .set('State',queyParams.State)
      
      if (queyParams.ProductId) {
      params = params.set('ProductId',queyParams.ProductId)
      }
      if (queyParams.OverallRating) {
       params = params.set('OverallRating',queyParams.OverallRating)
      }
      if (queyParams.ProductRating) {
      params = params.set('ProductRating',queyParams.ProductRating )
      }
    return this.htpp.get<Paginate<Review>>(`${this.baseUrl}/${this.service}/generalReview`,{params})
  }

  createReview(data : ReviewData):Observable<ReviewData>{
    return this.htpp.post<ReviewData>(`${this.baseUrl}/${this.service}`,data)
  }

}
