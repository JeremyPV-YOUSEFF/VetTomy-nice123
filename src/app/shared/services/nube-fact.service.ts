import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { NubeFactRequest } from '../interfaces/nubeFact.interface';

@Injectable({
  providedIn: 'root'
})
export class NubeFactService {

  private baseUrl = environment.baseUrl
  private service = 'store/sales'

  constructor(private htpp: HttpClient) { }

  newNubeFactByProduct(data: NubeFactRequest){
    return this.htpp.post(`${this.baseUrl}/${this.service}/nubeFact`,data)
  }

}
