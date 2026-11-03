import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NewSaleService, Sale } from '../interfaces/sale.interface';

interface IURL {
  url : string
}

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  private baseUrl = environment.baseUrl
  private service = 'store/checkout'

  constructor(private http: HttpClient) { }

  generateLink(data : Sale){
    return this.http.post<IURL>(`${this.baseUrl}/${this.service}`,data)
  }

  generateLinkAppointment(data : NewSaleService){
    return this.http.post<IURL>(`${this.baseUrl}/${this.service}/appointment`,data)
  }

}