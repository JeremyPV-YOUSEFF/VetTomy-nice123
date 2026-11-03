import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerData } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = environment.baseUrl
  private service = 'person/customer'
  constructor(private http : HttpClient ) { }

  getCustomerById(id: number):Observable<CustomerData>{
    return this.http.get<CustomerData>(`${this.baseUrl}/${this.service}/getInfoById/${id}`)
  }
  
}
