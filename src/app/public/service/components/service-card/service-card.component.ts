import { Component, Input } from '@angular/core';
import { ProductData } from '../../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { LoadingImageComponent } from '../../../../shared/components/loading-image/loading-image.component';

@Component({
  selector: 'service-service-card',
  imports: [RouterLink,LoadingImageComponent],
  templateUrl: './service-card.component.html',
  styles: ``
})
export class ServiceCardComponent {

  @Input() cardService !: ProductData

}
