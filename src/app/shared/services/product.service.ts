import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginate } from '../interfaces/paginate.interface';
import { ProductParams, ProductData } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.baseUrl
  private service = 'store/products_services'

  private listProduct = new BehaviorSubject<ProductData[]>([]);
  public productValue = this.listProduct.asObservable();

  constructor(private htpp :  HttpClient) { }

  getProducts(queryParam : ProductParams):Observable<Paginate<ProductData>>{
    let params = new HttpParams()
      .set('Type',queryParam.Type)
      .set('CurrentPage',queryParam.CurrentPage)
      .set('PageSize',queryParam.PageSize)
      .set('Relevance',queryParam.Relevance)
      .set('Sort',queryParam.Sort)
      .set('Search',queryParam.Search)
      .set('State',queryParam.State)

    if (queryParam.Brands.length > 0) {
      /* params = params.append('Brands',queryParam.Brands.join(',')) */
      queryParam.Brands.forEach(element => {
        params = params.append('Brands',element)
      });
    }

    if (queryParam.Category.length > 0) {
      /* params = params.append('Category',queryParam.Category.join(',')) */
      queryParam.Category.forEach(element => {
        params = params.append('Category',element)
      });
    }

    if (queryParam.TypePet.length > 0) {
      /* params = params.append('TypePet',queryParam.TypePet.join(',')) */
      /* queryParam.TypePet.forEach(element => {
        params = params.append('TypePet',element)
      }); */
    }
    return this.htpp.get<Paginate<ProductData>>(`${this.baseUrl}/${this.service}/generalProductServices`,{params})
  }

  getProductById(id:number):Observable<ProductData>{
    return this.htpp.get<ProductData>(`${this.baseUrl}/${this.service}/getById/${id}`)
  }

  addListProduct(data:ProductData[]):void{
    this.listProduct.next(data)
  }
  
}
