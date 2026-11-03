import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SaleService } from '../../../shared/services/sale.service';
import { switchMap } from 'rxjs';
import { SaleData } from '../../../shared/interfaces/sale.interface';
import { ProductSalePageComponent } from '../../components/product-sale-page/product-sale-page.component';
import { ServiceSalePageComponent } from '../../components/service-sale-page/service-sale-page.component';

@Component({
  selector: 'app-sale-detail-page',
  imports: [RouterLink,ProductSalePageComponent,ServiceSalePageComponent],
  templateUrl: './sale-detail-page.component.html',
  styles: ``
})
export class SaleDetailPageComponent implements OnInit {

  public saleDetailData ?: SaleData

  constructor(
    private activatedRoute : ActivatedRoute,
    private saleService : SaleService
  ) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.saleService.getSaleById(id))
      ).subscribe({
        next: (data) => {
          this.saleDetailData = data
        }
      })
  }

}
