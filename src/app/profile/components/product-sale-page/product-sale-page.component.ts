import { Component, Input, OnInit } from '@angular/core';
import { SaleData } from '../../../shared/interfaces/sale.interface';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { LoadingImageComponent } from '../../../shared/components/loading-image/loading-image.component';

@Component({
  selector: 'profile-product-sale-page',
  imports: [NgIf,DatePipe,CurrencyPipe,LoadingImageComponent],
  templateUrl: './product-sale-page.component.html',
  styles: ``
})
export class ProductSalePageComponent implements OnInit {

  

  @Input() productData !: SaleData 

  ngOnInit(): void {
    
  }


}
