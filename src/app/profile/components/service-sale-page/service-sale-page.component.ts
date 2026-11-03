import { Component, Input } from '@angular/core';
import { SaleData } from '../../../shared/interfaces/sale.interface';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { LoadingImageComponent } from '../../../shared/components/loading-image/loading-image.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'profile-service-sale-page',
  imports: [CurrencyPipe,DatePipe,LoadingImageComponent,NgIf],
  templateUrl: './service-sale-page.component.html',
  styles: ``
})
export class ServiceSalePageComponent {

   @Input() serviceData !: SaleData

}
