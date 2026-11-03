import { Component, Input } from '@angular/core';
import { LoadingImageComponent } from '../../../../shared/components/loading-image/loading-image.component';
import { CurrencyPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ProductData } from '../../../../shared/interfaces/product.interface';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmProductComponent } from '../../../shopping/components/confirm-product/confirm-product.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'store-card-on-sale-product',
  imports: [LoadingImageComponent,CurrencyPipe,TitleCasePipe,UpperCasePipe,RouterLink],
  templateUrl: './card-on-sale-product.component.html',
  styles: ``,
  providers:[
    DialogService
  ]
})
export class CardOnSaleProductComponent {
  @Input() product !: ProductData 

  constructor(
    private dialog : DialogService,
    private shoppingCart : ShoppingCartService
  ) {
    
  }

  addItem(data:ProductData):void{
    this.dialog.open(ConfirmProductComponent,{
      closable: true,
      data: data,
      header: "¡Añadido a tu carro!",
      width : '30rem',
      height: '20rem'
    })
    this.shoppingCart.addProduct(data,1)
  }

}
