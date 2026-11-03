import { Component } from '@angular/core';
import { SliderOnSaleProductComponent } from "../../components/slider-on-sale-product/slider-on-sale-product.component";
import { ListProductComponent } from "../../components/list-product/list-product.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-store-page',
  imports: [SliderOnSaleProductComponent, ListProductComponent,RouterLink],
  templateUrl: './store-page.component.html',
  styles: ``
})
export class StorePageComponent {
  
}
