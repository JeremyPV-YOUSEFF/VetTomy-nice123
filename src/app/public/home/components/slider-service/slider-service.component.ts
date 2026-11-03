import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductData, ProductParams } from '../../../../shared/interfaces/product.interface';
import { ProductService } from '../../../../shared/services/product.service';
import { CardSliderServiceComponent } from "../card-slider-service/card-slider-service.component";
import { LoadingTextComponent } from '../../../../shared/components/loading-text/loading-text.component';

@Component({
  selector: 'home-slider-service',
  imports: [CardSliderServiceComponent,LoadingTextComponent],
  templateUrl: './slider-service.component.html',
  styles: ``
})
export class SliderServiceComponent {

  @Output() sendId = new EventEmitter<number>();
  public listServices : ProductData[] = []
  public productParams = new ProductParams()
  public idService : number = 0 

  constructor (
    private productService : ProductService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.productParams.Type = 'Servicio'
    this.productParams.PageSize = 4
    this.productParams.Relevance = 'HomePage'
    this.productService.getProducts(this.productParams)
      .subscribe({
        next: (data) => {
            this.listServices = data.data
            const copyList = [...this.listServices]
            const newValue = copyList.shift()?.id
            if (newValue) {
              this.idService = newValue
            }
        }
      })
  }

  changeService(id:number){
    this.idService = id
  }

  navigate(){
    window.scrollTo(600,600)
    this.router.navigateByUrl('/dashboard/service')
  }

}
