import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SaleData, SaleSort, TypePurchaseEnum } from '../../../shared/interfaces/sale.interface';
import { Paginate } from '../../../shared/interfaces/paginate.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'profile-filter-sale',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './filter-sale.component.html',
  styles: ``
})
export class FilterSaleComponent implements OnInit {
  
  public sendTypePurchase = output<TypePurchaseEnum>();
  public sendSort = output<SaleSort>();

  public sendPage = output<number>();

  public receiveSaleData = input<Paginate<SaleData>>();

  public myForm : FormGroup


  constructor(
    private fb : FormBuilder
  ) {
    this.myForm = this.fb.group({
      typePurchase : [''],
      sortBy : ['dateDesc']
    })
  }

  ngOnInit(): void {
    this.changeSort();
    this.changeTypePurchase();
  }

  changeTypePurchase():void{
    this.myForm.get('typePurchase')?.valueChanges.subscribe({
      next : (data) => {
        this.sendTypePurchase.emit(data);
      }
    })
  }

  changeSort():void{
    this.myForm.get('sortBy')?.valueChanges.subscribe({
      next: (data) => {
        this.sendSort.emit(data)
      }
    })
  }

  changePage(id:number):void{
    this.sendPage.emit(id);
  }

  advancePage():void{
    if (this.receiveSaleData()) {
      let page = this.receiveSaleData()!.currentPage
      page++
      if (page>this.receiveSaleData()!.totalPages) return;
      this.sendPage.emit(page)
    }
  }

  turnBackPage():void{
    if (this.receiveSaleData()) {
      let page = this.receiveSaleData()!.currentPage
      page--
      if (page < 1) return;
      this.sendPage.emit(page)
    }
  }

}
