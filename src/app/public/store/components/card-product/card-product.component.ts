import { Component, Input } from '@angular/core';
import { ProductData } from '../../../../shared/interfaces/product.interface';
import { LoadingImageComponent } from '../../../../shared/components/loading-image/loading-image.component';
import { CurrencyPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmProductComponent } from '../../../shopping/components/confirm-product/confirm-product.component';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';

@Component({
  selector: 'store-card-product',
  imports: [LoadingImageComponent,TitleCasePipe,CurrencyPipe,UpperCasePipe,RouterLink],
  templateUrl: './card-product.component.html',
  styles: ``,
  providers: [
    DialogService
  ]
})
export class CardProductComponent {
  @Input() product !: ProductData

  constructor(
    private dialog : DialogService,
    private shoppingCart : ShoppingCartService
  ) {
  }


  addCart(data:ProductData):void{
    this.dialog.open(ConfirmProductComponent,{
      closable: true,
      data: data,
      header: "¡Añadido a tu carro!",
      width : '30rem',
      height: '20rem'
    })
    this.shoppingCart.addProduct(data, 1)
  }

  redirectionTo():void{
    scrollTo(0,0)
  }
}
