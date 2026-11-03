import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paginate } from '../interfaces/paginate.interface';
import { PetData, PetParams } from '../interfaces/pet.interface';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private baseUrl = environment.baseUrl
  private service = 'store/pets'

  constructor(private htpp: HttpClient) { }

  generalPets(query : PetParams):Observable<Paginate<PetData>>{
    let params = new HttpParams()
      .set('CurrentPage',query.CurrentPage)
      .set('PageSize',query.PageSize)
      .set('State',query.State)
      .set('Sort',query.Sort)
    if (query.CustomerId != 0) {
      params = params.set('CustomerId',query.CustomerId)
    }
    return this.htpp.get<Paginate<PetData>>(`${this.baseUrl}/${this.service}/generalPet`,{params})
  }
  
}
