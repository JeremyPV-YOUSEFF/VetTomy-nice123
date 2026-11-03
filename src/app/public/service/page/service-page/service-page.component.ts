import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ContactComponent } from '../../../../shared/components/contact/contact.component';
import { SliderImageComponent } from "../../../../shared/components/slider-image/slider-image.component";
import { ProductParams, ProductData } from '../../../../shared/interfaces/product.interface';
import { ProductService } from '../../../../shared/services/product.service';
import { LoadingTextComponent } from '../../../../shared/components/loading-text/loading-text.component';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';

@Component({
  imports: [SharedModule, ContactComponent, SliderImageComponent,LoadingTextComponent,ServiceCardComponent],
  templateUrl: './service-page.component.html',
  styles: ``
})
export class ServicePageComponent {

  public serviceParams : ProductParams = new ProductParams();
  public listService : ProductData[] = []

  constructor (
    private service : ProductService
  ){}

  ngOnInit(): void {
    this.serviceParams.Type = 'Servicio'
    this.service.getProducts(this.serviceParams)
      .subscribe({
        next: (data) => this.listService = data.data
      })
  }

}
