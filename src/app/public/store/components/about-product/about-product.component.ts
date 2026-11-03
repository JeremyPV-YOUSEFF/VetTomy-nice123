import { Component, Input } from '@angular/core';
import { ProductData } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'store-about-product',
  imports: [],
  templateUrl: './about-product.component.html',
  styles: ``
})
export class AboutProductComponent {
  @Input() productData !: ProductData
}
