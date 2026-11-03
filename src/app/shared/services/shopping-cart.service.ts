import { Injectable } from '@angular/core';
import { CartTotal, ProductData, ProductItemCart, ProductItemCartClass } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() {
    this.load();
    if (localStorage.getItem('shoppingCart')) {
      /* this.listCart.next(JSON.parse(localStorage.getItem('shoppingCart')!)) */
      this.listCart.next(this.decryptInfomation('shoppingCart',this.key))
    }
    if (localStorage.getItem('cartTotal')) {
      /* this.cartTotal.next(JSON.parse(localStorage.getItem('cartTotal')!)) */
      this.cartTotal.next(this.decryptInfomation('cartTotal',this.key))
    }
    this.totalSale()
    this.cartTotalPrice()
   }

  private newItem : ProductItemCartClass = new ProductItemCartClass()
  private listCart = new BehaviorSubject<ProductItemCart[]>([])
  public valueCart = this.listCart.asObservable()
  private key = '-zGKb[|8t~Nx9.m6p%.(c3VYCY'
  public total  = new BehaviorSubject<number>(0);
  public valueTotal = this.total.asObservable();

  private cartTotal = new BehaviorSubject<CartTotal>({address:'',addressId:0,deliveryPrice:8,subTotal:0,total:0});
  public valueCartTotal = this.cartTotal.asObservable();


  addProduct(item:ProductData, quantity : number){
    const cart = this.listCart.value
    this.newItem.product = item;
    this.newItem.quantity = quantity
    const index = cart.findIndex(x => x.product.id == item.id)
    if (index !== -1) {
      cart[index].quantity+=quantity
      if (cart[index].quantity > cart[index].product.stock) {
        cart[index].quantity = cart[index].product.stock
      }
    }else{
        cart.push({...this.newItem as Required<ProductItemCartClass>})
    }
    this.listCart.next(cart)
    this.totalSale()
    this.cartTotalPrice()
  }

  load():void{
    this.listCart.subscribe((data)=> {
      if(data.length>0){
        /* localStorage.setItem('shoppingCart',JSON.stringify(this.listCart.value)) */
        this.encriptedInformation('shoppingCart',this.listCart.value)
      }
    })
  }

  deleteItemCart(id:number):void{
    if (localStorage.getItem('shoppingCart')) {
      const data : ProductItemCart[] =  this.decryptInfomation('shoppingCart',this.key)
      const deleteIndex = data.filter(x => x.product.id !== id)
      this.listCart.next(deleteIndex)
      /* localStorage.setItem('shoppingCart',JSON.stringify(this.listCart.value)) */
      this.encriptedInformation('shoppingCart',this.listCart.value)
    }
    this.totalSale()
    this.cartTotalPrice();
  }

  deleteAllCart():void{
    this.listCart.next([]);
    /* localStorage.setItem('shoppingCart',JSON.stringify(this.listCart.value)) */
    this.encriptedInformation('shoppingCart',this.listCart.value)
    this.totalSale();
    localStorage.removeItem('shoppingCart')
    this.cartTotalPrice();
  }

  changeQuantity(idProduct : number, quantity : number):void{
    const data = this.listCart.value
    data.forEach(element => {
      if (element.product.id == idProduct) {
        element.quantity = quantity
      }
    });
    this.listCart.next(data)
    this.totalSale()
    this.cartTotalPrice();
  }

  private totalSale():void{
    const data = this.listCart.value
    if (!data) return;
    const total = data.reduce((sum,item)=> sum + ( (item.product.discount>0 ? item.product.priceWithDiscount : item.product.price) * (item.quantity)),0)
    this.total.next(total);
  }

  private cartTotalPrice():void{
    const data = this.listCart.value
    if (!data) return;
    const total = data.reduce((sum,item)=> sum + ( (item.product.discount>0 ? item.product.priceWithDiscount : item.product.price) * (item.quantity)),0)
    const newData = { ...this.cartTotal.value};
    newData.subTotal = total
    if (newData.deliveryPrice === 0) {
      newData.total = newData.subTotal
    }else{
      newData.total = newData.subTotal + newData.deliveryPrice
    }
    this.cartTotal.next(newData)
    /* localStorage.setItem('cartTotal',JSON.stringify(newData)) */
    this.encriptedInformation('cartTotal',newData)
  }

  changeDeliveryPrice(data:number):void{
    this.cartTotal.next({
      ...this.cartTotal.value,
      deliveryPrice : data
    })
    this.cartTotalPrice();
  }


  deleteCartTotal(){
    this.cartTotal.complete()
    localStorage.removeItem('cartTotal')
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
