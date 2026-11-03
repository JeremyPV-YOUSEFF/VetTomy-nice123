import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Paginate } from '../interfaces/paginate.interface';
import { Category, CategoryParams, CategoryShort } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.baseUrl
  private service = 'store/categories'
  constructor(private http : HttpClient ) { }

    getCategories(queryParams : CategoryParams):Observable<Paginate<CategoryShort>>{
      let params = new HttpParams()
        .set('Exclude',queryParams.Exclude)
        .set('PageSize',100000)
        .set('CurrentPage',queryParams.CurrentPage)
      
      return this.http.get<Paginate<Category>>(`${this.baseUrl}/${this.service}/generalCategories`,{params})
        .pipe(
          map(categories => {
            return {
              ...categories,
              data : categories.data.map(categorie => ({
                name : categorie.name
              }))
            }
          })
        )
    }
    
}
