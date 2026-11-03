import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Business } from '../interfaces/business.interface';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private baseUrl = environment.baseUrl
  private service = 'business/business'
  constructor(private http : HttpClient ) { }

  getBusiness():Observable<Business>{
    return this.http.get<Business>(`${this.baseUrl}/${this.service}/1`)
  }
  
}
