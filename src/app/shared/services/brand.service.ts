import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BrandParams, BrandShort, Brand } from '../interfaces/brand.interface';
import { Paginate } from '../interfaces/paginate.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private baseUrl = environment.baseUrl
  private service = 'store/brands'

  constructor(private http: HttpClient) { }

  getBrands(queryParams : BrandParams):Observable<Paginate<BrandShort>>{
    let params = new HttpParams()
      .set('CurrentPage',queryParams.CurrentPage)
      .set('PageSize',100000)
      .set('Exclude',queryParams.Exclude)
    if (queryParams.Search != '') {
      params = params.set('Search',queryParams.Search)
    }
    const url = `${this.baseUrl}/${this.service}/generalBrands`
    return this.http.get<Paginate<Brand>>(url,{params})
      .pipe(
        map(brands => {
          return {
            ...brands,
            data : brands.data.map(brand => ({
              name : brand.name
            }))
          }
        })
      )
  }
  
}
