import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface BannerData {
  id : number,
  file : FormData
}

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private baseUrl = environment.baseUrl
  private service = 'person/banners'

  constructor(private http: HttpClient) { }

  updateBanner(id:number, file: FormData){
    return this.http.put(`${this.baseUrl}/${this.service}/${id}`,file)
  }

}
