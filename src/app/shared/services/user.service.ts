import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordProfile } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl
  private service = 'person/users'

  constructor(private htpp: HttpClient) { }

  changePassword(data:ChangePasswordProfile){
    return this.htpp.put(`${this.baseUrl}/${this.service}/changePassword`,data)
  }

}
