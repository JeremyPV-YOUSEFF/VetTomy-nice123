import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PaginateData } from '../../../../shared/interfaces/paginate.interface';
import { ProductData, ProductParams, RelevanceProduct } from '../../../../shared/interfaces/product.interface';
import { ProductService } from '../../../../shared/services/product.service';
import { CardProductComponent } from '../../../store/components/card-product/card-product.component';
import { LoadingTextComponent } from '../../../../shared/components/loading-text/loading-text.component';

@Component({
  selector: 'home-slider-product',
  imports: [CardProductComponent,LoadingTextComponent],
  templateUrl: './slider-product.component.html',
  styles: ``
})
export class SliderProductComponent implements OnInit, OnChanges {

  @Input() typeScreen : RelevanceProduct = ''

  public listProducts : ProductData[] = []
  public paginateInfo : PaginateData | null = null 
  public productParams : ProductParams = new ProductParams()
  constructor (
    private productService : ProductService
  ) {
  }

  ngOnInit(): void {
    this.productParams.PageSize = 5
    this.productParams.Type = 'Producto'
    this.productParams.Relevance = 'HomePage'
    this.getProducts()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['typeScreen']) {
      if (!this.typeScreen) return
      this.productParams.Relevance = this.typeScreen
    }
  }

  getProducts(){
    this.productService.getProducts(this.productParams)
      .subscribe({
        next: (data) => {
          this.listProducts = data.data
          if (data) {
            this.paginateInfo = data
          }
        }
      })
  }

  changeRelevane(){

  }


  backCard(){
    setTimeout(() => {
      if (this.paginateInfo && this.productParams.CurrentPage > 1 ) {
        this.productParams.CurrentPage--
        this.getProducts()
      }
    }, 500);
  }

  advancedCard(){
    setTimeout(() => {
      if (this.paginateInfo && this.productParams.CurrentPage === this.paginateInfo.totalPages ) {
        this.productParams.CurrentPage = 1;
        this.getProducts()
      }
      if ( this.paginateInfo &&  this.productParams.CurrentPage<=this.paginateInfo?.totalPages) {
        this.productParams.CurrentPage ++ 
        this.getProducts()
      }
    }, 500);
  }

} 
