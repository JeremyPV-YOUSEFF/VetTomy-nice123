import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../shared/services/product.service';
import { CartTotal, ProductData, ProductItemCart } from '../../../../shared/interfaces/product.interface';
import { SharedModule } from "../../../../shared/shared.module";
import { CurrencyPipe, NgClass } from '@angular/common';
import { CounterStockComponent } from "../../../store/components/counter-stock/counter-stock.component";
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { LoginDialogComponent } from '../../../../auth/components/login-dialog/login-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from '../../../../shared/alerts/toast.service';
import { ToastModule } from 'primeng/toast';

@Component({
  imports: [SharedModule, CurrencyPipe, CounterStockComponent,RouterLink,NgClass,ToastModule],
  templateUrl: './shopping-cart-page.component.html',
  styles: ``,
  providers: [
    DialogService,
    DynamicDialogRef
  ]
})
export class ShoppingCartPageComponent implements OnInit {

  public productData : ProductItemCart[] = []
  public totalCart : number = 0
  public cartTotalValue : CartTotal | undefined = undefined

  constructor(
    private shoppingCart : ShoppingCartService,
    private auth :  AuthenticationService,
    public ref : DynamicDialogRef,
    public dialogService: DialogService,
    private alert : ToastService,
    private router : Router
  ) {
    this.total()
  }

 
  ngOnInit(): void {
    this.shoppingCart.valueCart.subscribe({
      next: (data) => {
        if (!data) return
        this.productData = data
      }
    })
    this.cartTotal()
    this.receiveData
  }

   get receiveData (){
    return this.auth.profileData
  }



  deleteProduct(id:number):void{
    this.shoppingCart.deleteItemCart(id)
  }


  total():void{
     this.shoppingCart.valueTotal.subscribe({
      next: (data) => {
        this.totalCart = data;
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

  validate():void{
    if (!this.receiveData) {
      this.ref = this.dialogService.open(LoginDialogComponent,{
          header: 'Para realizar una compra, primero necesitas Iniciar Sesión',
          closable : true,
          width: '25rem',
          height: '32rem' 
        })
        this.ref.onClose.subscribe((data:boolean)=>{
          if (data) {
            this.alert.showSucces("Sesion iniciada correctamente")
            setTimeout(() => {
              this.router.navigateByUrl('/dashboard/checkout/id')
            }, 2000);
          }
        })
      return;
    }
    this.router.navigateByUrl('/dashboard/checkout/id')
  }

 
}
