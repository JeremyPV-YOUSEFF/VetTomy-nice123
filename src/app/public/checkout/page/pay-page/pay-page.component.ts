import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SaleClass } from '../../../../shared/interfaces/sale.interface';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';
import { SaleService } from '../../../../shared/services/sale.service';
import { Router, RouterLink } from '@angular/router';
import { CartTotal, ProductItemCart } from '../../../../shared/interfaces/product.interface';
import { LoadingImageComponent } from '../../../../shared/components/loading-image/loading-image.component';
import { ToastService } from '../../../../shared/alerts/toast.service';
import { CurrencyPipe } from '@angular/common';
import { CheckOutService } from '../../../../shared/services/check-out.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-pay-page',
  imports: [ReactiveFormsModule,RouterLink,LoadingImageComponent,CurrencyPipe,ToastModule],
  templateUrl: './pay-page.component.html',
  styles: ``
})
export class PayPageComponent implements OnInit {

  public formSale : SaleClass = new SaleClass();
  public cartItems : ProductItemCart[] = []
  public cartTotalValue : CartTotal | undefined = undefined
  
  constructor(
    private auth          : AuthenticationService,
    private shoppingCart  : ShoppingCartService,
    private saleService   : SaleService,
    private checkOut : CheckOutService,
    private alert : ToastService
  ) {
    
  }

  ngOnInit(): void {
    this.receiveData;
    this.shoppingCart.valueCart.subscribe({
      next: (data) => {
        if (!data) return
        this.formSale.data = data;
        this.cartItems = data
      }
    })
    this.information();
    this.cartTotal();
  }

  get receiveData (){
    return this.auth.profileData
  }

  information():void{
    this.saleService.data.subscribe({
      next: (data) => {
        if (data) {
          this.formSale.addressId = data.addressId
          this.formSale.deliveryType = data.deliveryType
          this.formSale.deliveryDate = data.deliveryDate
          this.formSale.receiptType = data.receiptType
        }
      }
    })
  }

  newSale():void{
    if (!this.receiveData) return;

    this.formSale.customerId = this.receiveData.customerId;
    this.formSale.branchId = 1;
    this.formSale.employeId = 1;
    this.formSale.total = this.cartTotalValue!.total
    this.formSale.deliveryPrice = this.cartTotalValue!.deliveryPrice;
    this.formSale.observation = "Ninguna";
    this.formSale.meansPayment = "Tarjeta";
    this.saleService.addSaleData(this.formSale);
    this.checkOut.generateLink(this.formSale).subscribe({
      next : (data) => {
        window.location.href = data.url
      },error: (err) => {
        this.alert.showError();
      }
    })
  }

  cartTotal():void{
    this.shoppingCart.valueCartTotal.subscribe({
      next: (data) => {
        this.cartTotalValue = data
      } 
    })
  }

}
