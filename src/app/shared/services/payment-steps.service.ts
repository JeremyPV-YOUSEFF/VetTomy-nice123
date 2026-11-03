import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as CryptoJS from 'crypto-js';

export interface PaymentStepsState {
  id : boolean,
  address : boolean,
  payment : boolean
}

@Injectable({
  providedIn: 'root'
})
export class PaymentStepsService {

  private paymentStepsBehavior = new BehaviorSubject<PaymentStepsState>({id:true,address:false,payment:false});
  public valuePayment = this.paymentStepsBehavior.asObservable();
  private key = '-zGKb[|8t~Nx9.m6p%.(c3VYCY'

  constructor() {
    if (localStorage.getItem('paymentSteps')) {
      /* this.paymentStepsBehavior.next(JSON.parse(localStorage.getItem('paymentSteps')!)) */
      this.paymentStepsBehavior.next(this.decryptInfomation('paymentSteps',this.key))
    }
   }

  validAddress():void{
    this.paymentStepsBehavior.next({
      ...this.paymentStepsBehavior.value,
      address : true
    })
    this.load()
  }

  validPayment():void{
    this.paymentStepsBehavior.next({
      ...this.paymentStepsBehavior.value,
      payment : true
    })
    this.load()
  }

  resetSteps():void{
    this.paymentStepsBehavior.next({
      id: false,
      address: false,
      payment: false
    })
    this.load()
  }

  deleteSteps():void{
    localStorage.removeItem('paymentSteps')
  }

  load():void{
    /* localStorage.setItem('paymentSteps',JSON.stringify(this.paymentStepsBehavior.value)) */
    this.encriptedInformation('paymentSteps',this.paymentStepsBehavior.value)
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
