import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppointmentData, AppointmentParams, CreateAppointment } from '../interfaces/appointment.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginate } from '../interfaces/paginate.interface';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = environment.baseUrl
  private service = 'pet/appointments'
  private key = '-zGKb[|8t~Nx9.m6p%.(c3VYCY'
  private appointment = new BehaviorSubject<CreateAppointment|undefined>(undefined);
  public appointmentValue = this.appointment.asObservable();

  constructor(private http: HttpClient) 
  {
    if (localStorage.getItem('appointment')) {
      /* this.appointment.next(JSON.parse(localStorage.getItem('appointment')!)) */
      this.appointment.next(this.decryptInfomation('appointment',this.key))
    }
  }

  generalAppointments(query : AppointmentParams):Observable<Paginate<AppointmentData>>{
    let params = new HttpParams()
      .set('CurrentPage',query.CurrentPage)
      .set('PageSize',query.PageSize)
      .set('State',query.State)
      .set('Sort',query.Sort)
    if (query.CustomerId!=0) {
      params = params.set('CustomerId',query.CustomerId)
    }
    return this.http.get<Paginate<AppointmentData>>(`${this.baseUrl}/${this.service}/generalAppointment`,{params})
  }

  createAppointment(data : CreateAppointment){
    return this.http.post(`${this.baseUrl}/${this.service}`,data)
  }

  uploadAppointment(data : CreateAppointment):void{
    this.appointment.next(data);
    /* localStorage.setItem('appointment',JSON.stringify(this.appointment.value)); */
    this.encriptedInformation('appointment',this.appointment.value)
  }

  deleteAppointment():void{
    this.appointment.next(undefined);
    localStorage.removeItem('appointment');
  }

  encriptedInformation(name:string,token: any,):void{
    const data = JSON.stringify(token);
    const encrypted = CryptoJS.AES.encrypt(data,this.key).toString();
    localStorage.setItem(name,encrypted)
  }

  decryptInfomation(name:string,token:any):any{
    const stored = localStorage.getItem(name);
    const bytes = CryptoJS.AES.decrypt(stored!,token);
    const originalData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return originalData;
  }

}
