import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IReceiptType, NewSaleService, Sale, SaleClass, SaleData, SaleExtraData, SaleParams, SaleResponse } from '../interfaces/sale.interface';
import { Paginate } from '../interfaces/paginate.interface';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private baseUrl = environment.baseUrl
  private service = 'store/sales'
  private key = '-zGKb[|8t~Nx9.m6p%.(c3VYCY'

  private sendData = new BehaviorSubject<SaleExtraData>(new SaleExtraData());
  public data = this.sendData.asObservable();

  private saleData = new BehaviorSubject<Sale |undefined>(undefined);
  public valueSaleData = this.saleData.asObservable();

  public newSalePayment = new BehaviorSubject<NewSaleService|undefined >(undefined)
  public newSaleValue = this.newSalePayment.asObservable();

  constructor(private http : HttpClient ) {
    if (localStorage.getItem('address')) {
      /* this.sendData.next(JSON.parse(localStorage.getItem('address')!)) */
      this.sendData.next(this.decryptInfomation('address',this.key))
    }

    if (localStorage.getItem('product')) {
      /* this.saleData.next(JSON.parse(localStorage.getItem('product')!)) */
      this.saleData.next(this.decryptInfomation('product',this.key))
    }
    if (localStorage.getItem('salePayment')) {
      /* this.newSalePayment.next(JSON.parse(localStorage.getItem('salePayment')!)) */
      this.newSalePayment.next(this.decryptInfomation('salePayment',this.key))
    }
   }

  newSale(data: Sale):Observable<SaleResponse>{
    return this.http.post<SaleResponse>(`${this.baseUrl}/${this.service}/newSale`,data)
  }

  newSaleService(data: NewSaleService){
    return this.http.post<SaleResponse>(`${this.baseUrl}/${this.service}/newSaleService`,data)
  }

  sendInformation(data : SaleExtraData):void{
    this.sendData.next({
      ...this.sendData.value,
      addressId : data.addressId,
      deliveryDate : data.deliveryDate,
      deliveryType : data.deliveryType
    });
    /* localStorage.setItem('address',JSON.stringify(this.sendData.value)) */
    this.encriptedInformation('address',this.sendData.value)
  }

  changeReceiptType(data : IReceiptType ):void{
    this.sendData.next({
      ...this.sendData.value,
      receiptType : data
    })
    /* localStorage.setItem('address',JSON.stringify(this.sendData.value)) */
    this.encriptedInformation('address',this.sendData.value)
  }

  deleteReceipType():void{
    localStorage.removeItem('address')
  }


  getSales(query : SaleParams):Observable<Paginate<SaleData>>{
    let params = new HttpParams()
    .set('TypePurchase',query.TypePurchase)
    .set('Sort',query.Sort)
    .set('PageSize',query.PageSize)
    .set('CurrentPage',query.CurrentPage)
    if (query.CustomerId != 0) {
      params = params.set('CustomerId',query.CustomerId)
    }
    return this.http.get<Paginate<SaleData>>(`${this.baseUrl}/${this.service}/generalResponse`,{params})
  }

  getSaleById(id: number):Observable<SaleData>{
    return this.http.get<SaleData>(`${this.baseUrl}/${this.service}/${id}`)
  }

  addSaleData(data:Sale):void{
    this.saleData.next(data);
    /* localStorage.setItem('product',JSON.stringify(data)) */
    this.encriptedInformation('product',data)
  }

  deleteEvidende():void{
    localStorage.removeItem('product')
  }

  uploadSale(data:NewSaleService):void{
    this.newSalePayment.next(data);
    /* localStorage.setItem('salePayment', JSON.stringify(this.newSalePayment.value)) */
    this.encriptedInformation('salePayment',this.newSalePayment.value)
  }

  deleteSale():void{
    this.newSalePayment.next(undefined);
    localStorage.removeItem('salePayment')
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
