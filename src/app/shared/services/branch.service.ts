import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginate } from '../interfaces/paginate.interface';
import { BranchData, BranchParams } from '../interfaces/branch.interface';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private baseUrl = environment.baseUrl
  private service = 'pet/branchs'

  constructor(private http: HttpClient) { }
  
  generalBranch(query : BranchParams):Observable<Paginate<BranchData>>{
    let params = new HttpParams()
      .set('CurrentPage',query.CurrentPage)
      .set('PageSize',query.PageSize)
      .set('Type',query.Type)
    if (query.State!=null) {
      params = params.set('State',query.State)
    }
    return this.http.get<Paginate<BranchData>>(`${this.baseUrl}/${this.service}/generalBranchs`,{params})
  }

}
