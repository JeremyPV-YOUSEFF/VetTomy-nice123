import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private baseUrl = environment.baseUrl
  private service = 'person/person'

  constructor(private htpp: HttpClient) { }
  
  getPersonById(id : number):Observable<Person>{
    return this.htpp.get<Person>(`${this.baseUrl}/${this.service}/${id}`)
  }

  updatePerson(id:number,data:Person){
    return this.htpp.put(`${this.baseUrl}/${this.service}/${id}`,data)
  }

}
