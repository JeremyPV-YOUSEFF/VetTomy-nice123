import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeParams, EmployeeData } from '../interfaces/employee.interface';
import { Paginate } from '../interfaces/paginate.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.baseUrl
  private service = 'person/employee'

  constructor(private htpp: HttpClient) { }


  getEmployees(param : EmployeeParams):Observable<Paginate<EmployeeData>>{
    let params = new HttpParams()
      .set('PageSize',param.PageSize)
      .set('CurrentPage',param.CurrentPage)
      .set('Type',param.Type)
      .set('Sort',param.Sort)
      .set('Search',param.Search)
    return this.htpp.get<Paginate<EmployeeData>>(`${this.baseUrl}/${this.service}/generalEmployee`,{params})
  }

  getEmployeeById(id : string):Observable<EmployeeData>{
    return this.htpp.get<EmployeeData>(`${this.baseUrl}/${this.service}/getInfoById/${id}`,)
  }
  
}
