import { Component } from '@angular/core';
import { ProductData, ProductParams } from '../../../../shared/interfaces/product.interface';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { ProductService } from '../../../../shared/services/product.service';
import { CardOnSaleProductComponent } from '../card-on-sale-product/card-on-sale-product.component';
import { NgClass } from '@angular/common';
import { LoadingTextComponent } from '../../../../shared/components/loading-text/loading-text.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'store-slider-on-sale-product',
  imports: [CardOnSaleProductComponent,NgClass,LoadingTextComponent],
  templateUrl: './slider-on-sale-product.component.html',
  styles: ``
})
export class SliderOnSaleProductComponent {
  public productParams : ProductParams = new ProductParams();
  public listProducts : ProductData[] = [];
  public paginateProduct : Paginate<ProductData> | null = null 
  public indiceByPage : number | null = null
  public intervalId : any

  constructor(
   private productService : ProductService 
  ){}

  ngOnInit(): void {
    this.productParams.Relevance = 'StorePage'
    this.productParams.Type = 'Producto'
    this.productParams.PageSize = 2
    this.getProducts()
    this.counter();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getProducts():void{
    this.productService.getProducts(this.productParams)
      .subscribe({
        next: (data) => {
          this.listProducts = data.data
          this.paginateProduct = data
          this.indiceByPage = this.paginateProduct.currentPage
        }
      })
  }

  onChangePage(page : number):void{
    this.indiceByPage = page
    this.productParams.CurrentPage = page
    this.getProducts()
  }

  counter():void{
    this.intervalId = setInterval(() => {
      if ( this.paginateProduct && this.paginateProduct?.currentPage < this.paginateProduct?.totalPages) {
        this.productParams.CurrentPage ++
        this.getProducts();
      }

      if (this.paginateProduct && this.paginateProduct.currentPage === this.paginateProduct.totalPages ) {
        this.productParams.CurrentPage = 1
        this.getProducts();
      }

    }, 10000);
  }
}
