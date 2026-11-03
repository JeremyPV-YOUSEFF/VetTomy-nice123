import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DNI, RUC } from '../interfaces/dni.interface';

@Injectable({
  providedIn: 'root'
})
export class DniService {
  private baseUrl = 'https://dniruc.apisperu.com/api/v1'
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InllcmVteXB2MTIzQGdtYWlsLmNvbSJ9.TkjcSXnkRMqqcNAtwNZnyhg_dAqSnCdeDcMfo6XzPOc'
  
  constructor(private http : HttpClient ) { }

  getDataByDni(dni:string):Observable<DNI>{
    let params = new HttpParams()
      .set('token',this.token)
    return this.http.get<DNI>(`${this.baseUrl}/dni/${dni}`,{params})
  }

  getDataByRuc(ruc:string):Observable<RUC>{
    let params = new HttpParams()
      .set('token',this.token)
    return this.http.get<RUC>(`${this.baseUrl}/ruc/${ruc}`,{params})
  }

}
