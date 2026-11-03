import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of, map } from 'rxjs';
import { TypeBusinessImage, ShortBusinessImage, BusinessImage } from '../interfaces/businessImage.interface';

@Injectable({
  providedIn: 'root'
})
export class BusinessImageService {
  
  private baseUrl = environment.baseUrl
  private service = 'business/businessImage'

  constructor(private http : HttpClient) { }
  
  getImages(type : TypeBusinessImage ):Observable<ShortBusinessImage[]>{
    if (!type) return of([])
    let params = new HttpParams()
      .set('type',type)
    return this.http.get<BusinessImage[]>(`${this.baseUrl}/${this.service}/imageByType`,{params})
      .pipe(
        map(images => images.map(image => ({
          url : image.url
        })))
      )
  }

}
