import { Component, OnInit } from '@angular/core';
import { SaleData, SaleParams, SaleSort, TypePurchaseEnum } from '../../../shared/interfaces/sale.interface';
import { SaleService } from '../../../shared/services/sale.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { LoadingImageComponent } from '../../../shared/components/loading-image/loading-image.component';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Paginate } from '../../../shared/interfaces/paginate.interface';
import { FilterSaleComponent } from "../../components/filter-sale/filter-sale.component";

@Component({
  selector: 'app-my-shopping-page',
  imports: [LoadingImageComponent, CurrencyPipe, RouterLink, DatePipe, ReactiveFormsModule, FilterSaleComponent,NgClass],
  templateUrl: './my-shopping-page.component.html',
  styles: ``
})
export class MyShoppingPageComponent implements OnInit {

  public saleParams : SaleParams = new SaleParams()
  public SaleData : SaleData[] = [] 
  public sale ?: Paginate<SaleData>

  constructor(
    private saleService : SaleService,
    private auth :  AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.recieveData
    if (!this.recieveData) return;
    this.saleParams.CustomerId = this.recieveData.customerId
    this.saleParams.TypePurchase = '';
    this.getSales();
  }

  get recieveData (){
    return this.auth.profileData
  }

  getSales():void{
    this.saleService.getSales(this.saleParams).subscribe({
      next: (data) => {
        this.SaleData = data.data
        this.sale = data
      }
    })
  }

  receiveChangeTypePurchase(data:TypePurchaseEnum):void{
    this.saleParams.TypePurchase = data;
    this.getSales();
  }

  receiveChangeSort(data:SaleSort):void{
    this.saleParams.Sort = data;
    this.getSales();
  }
  
  receiveChangePage(page:number):void{
    this.saleParams.CurrentPage = page;
    this.getSales();
  }
}
