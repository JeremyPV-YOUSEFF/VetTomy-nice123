import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginate } from '../interfaces/paginate.interface';
import { Address, AddressData, AddressParams } from '../interfaces/address.interface';

type stateAddress = 'completed' | 'rejected' 

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl = environment.baseUrl
  private service = 'person/address'
  private stateAddress = new BehaviorSubject<stateAddress|undefined>(undefined)
  public addressValue = this.stateAddress.asObservable();

  constructor(private http: HttpClient) { }

  generalAddress(query: AddressParams):Observable<Paginate<AddressData>>{
    let params = new HttpParams()
      .set('Sort',query.Sort)

    if (query.PersonId != 0) {
      params = params.set('PersonId',query.PersonId)
    }      

    return this.http.get<Paginate<AddressData>>(`${this.baseUrl}/${this.service}/generalAddress`,{params})
  }

  createAddress(data: Address){
    return this.http.post(`${this.baseUrl}/${this.service}`,data)
  }

  editAddress(id:number, data :  Address){
    return this.http.put(`${this.baseUrl}/${this.service}/${id}`,data)
  }

  getAddressById(id:number):Observable<Address>{
    return this.http.get<Address>(`${this.baseUrl}/${this.service}/${id}`)
  }

  onCompleted():void{
    this.stateAddress.next('completed');
  }

  onRejected():void{
    this.stateAddress.next('rejected')
  }

  onDeleted():void{
    this.stateAddress.complete();
  }

}
