import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RegisterCustomer, ResponseRegisterCustome, SendEmailCustomerResponse } from '../interfaces/register.interface';
import { ValidateEmail } from '../interfaces/email.interface';
import { LoginResponse, SignIn, UserAppProfile } from '../interfaces/sign-up.interface';
import { DontRepeatEmail, IsValidEmail } from '../interfaces/emailExits.interface';
import { Auth, signInWithPopup , GoogleAuthProvider } from '@angular/fire/auth'
import { ValidateEmailToken } from '../interfaces/token.interface';
import { ChangePassword, RequestEmail, SendEmailResponse, VerificCodeRequest } from '../interfaces/forgetPassword.interface';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = environment.baseUrl
  private service = 'auth/authentication'
  private key = '-zGKb[|8t~Nx9.m6p%.(c3VYCY'

  private profile ?: UserAppProfile
  private profileSubject = new BehaviorSubject<UserAppProfile|null>(null);
  
  private _auth = inject(Auth);
  
  constructor(private http: HttpClient) { 
    const profileData = localStorage.getItem('profile');
    if (profileData) {
      this.profileSubject.next(this.decryptInfomation('profile',this.key))
    }
  }

  get profileData (){
    return this.profileSubject.value
  }

  registerCustome(data : RegisterCustomer):Observable<ResponseRegisterCustome>{
    return this.http.post<ResponseRegisterCustome>(`${this.baseUrl}/${this.service}/registerCustomer`,data)
  }

  sendEmailVerficate(data : RegisterCustomer):Observable<SendEmailCustomerResponse>{
    return this.http.post<SendEmailCustomerResponse>(`${this.baseUrl}/${this.service}/sendEmail`,data)
  }

  signIn(data:SignIn):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/${this.service}/login`,data)
      .pipe(
        tap((response)=> this.processLogin(response))
      )
  }

  validateEmail(data: ValidateEmail):Observable<ValidateEmail>{
    return this.http.post<ValidateEmail>(`${this.baseUrl}/${this.service}/validateEmail`,data)
  }

  emailExist(data:  DontRepeatEmail):Observable<IsValidEmail>{
    return this.http.post<IsValidEmail>(`${this.baseUrl}/${this.service}/verificEmail`,data)
  }


  signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this._auth,provider)
  }

  validateTokenByGoogle(data: ValidateEmailToken):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/${this.service}/validateEmailTokenByGoogle`,data)
      .pipe(
        tap((response)=> this.processLogin(response)
        )
      )
  }
  
  private processLogin(res : LoginResponse){
    this.profile = res.profile;
    this.profileSubject.next(this.profile);
    /* localStorage.setItem('token',res.token);
    localStorage.setItem('profile',JSON.stringify(res.profile)); */
    this.encriptedInformation('token',res.token)
    this.encriptedInformation('profile',res.profile)
  }

  logOut():void{
    this.profile = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.profileSubject.next(null);
  }

  sendEmail(data: RequestEmail):Observable<SendEmailResponse>{
    return this.http.post<SendEmailResponse>(`${this.baseUrl}/${this.service}/forgetPasswordSendEmail`,data)
  }

  validCodeByEmail(data : VerificCodeRequest){
    return this.http.post(`${this.baseUrl}/${this.service}/forgetPasswordVerificCode`,data)
  }

  changePassword(data:ChangePassword){
    return this.http.post(`${this.baseUrl}/${this.service}/changePassword`,data)
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
