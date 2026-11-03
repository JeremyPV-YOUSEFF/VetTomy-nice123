import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SortProductList, DataSortProductList } from './filter-mockup';
import { ProductData, SortProduct } from '../../../../shared/interfaces/product.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { NgClass } from '@angular/common';

export type directionByPage = 'Left'|'Right'|''

@Component({
  selector: 'store-sort-product',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './sort-product.component.html',
  styles: ``
})
export class SortProductComponent implements OnInit, OnChanges {

  @Input() dataProduct : Paginate<ProductData> | null = null
  @Output() sendSortProduct : EventEmitter<SortProduct> = new EventEmitter<SortProduct>();
  @Output() sendCurrentPage = new EventEmitter<number>();

  public productSortData : SortProductList[] = DataSortProductList
  public currenPage : number = 1
  public myForm : FormGroup

  constructor(
    private fb: FormBuilder
  ){
    this.myForm = this.fb.group({
      sortProdut : ['']
    })
  }

  ngOnInit(): void {
    this.getValueSortProduct();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataProduct']) {
      if (!this.dataProduct) return
      this.currenPage = this.dataProduct.currentPage
    }
  }

  getValueSortProduct():void{
    this.myForm.get('sortProdut')?.valueChanges.subscribe((data)=>{
      this.sendSortProduct.emit(data);
    })
  }

  changePage(direction:directionByPage, page ?: number):void{
    if (direction == 'Left'){
      if (this.dataProduct && this.dataProduct.currentPage>1) {
        this.currenPage--;
        this.sendCurrentPage.emit(this.currenPage)
      }
    }else if (direction=='Right'){
      if (this.dataProduct && this.dataProduct.currentPage<this.dataProduct.totalPages) {
        this.currenPage++;
        this.sendCurrentPage.emit(this.currenPage)
      }
    }else{
      if(page){
        this.sendCurrentPage.emit(page);
      }
    }
  }

}
