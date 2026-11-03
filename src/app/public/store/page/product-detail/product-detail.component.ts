import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../shared/services/product.service';
import { switchMap } from 'rxjs';
import { ReviewService } from '../../../../shared/services/review.service';
import { Review, ReviewParams } from '../../../../shared/interfaces/review.interface';
import { SliderProductComponent } from '../../../home/components/slider-product/slider-product.component';
import { Information, InformationProduct, MeansPayment, MeansPaymentInfo } from './product-mockup';
import { LoadingImageComponent } from '../../../../shared/components/loading-image/loading-image.component';
import { ProductData } from '../../../../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { LoadingTextComponent } from '../../../../shared/components/loading-text/loading-text.component';
import { CounterStockComponent } from "../../components/counter-stock/counter-stock.component";
import { AboutProductComponent } from "../../components/about-product/about-product.component";
import { RatingProductComponent } from "../../components/rating-product/rating-product.component";
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmProductComponent } from '../../../shopping/components/confirm-product/confirm-product.component';

@Component({
  selector: 'store-product-detail',
  imports: [SliderProductComponent, LoadingImageComponent, CurrencyPipe, 
            LoadingTextComponent, CounterStockComponent, AboutProductComponent, 
            RatingProductComponent],
  templateUrl: './product-detail.component.html',
  providers: [
    DialogService
  ],
  styles: ``
})
export class ProductDetailComponent implements OnInit {

  public meansPayment : MeansPayment[] = MeansPaymentInfo
  public getInfoProduct : Information[] = InformationProduct 
  public reviewParams : ReviewParams = new ReviewParams();

  public productData : ProductData | null = null
  public reviewData : Paginate<Review> | null = null
  public productId : number | null = null

  public quantity : number = 0

  constructor (
    private activatedRoute : ActivatedRoute,
    private productService : ProductService,
    private reviewService : ReviewService,
    private shoppingCart : ShoppingCartService,
    private dialog : DialogService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.productService.getProductById(id))
      ).subscribe({
        next: (data) => this.productData = data
      })
    this.getReviews()
  }

  getReviews():void{
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> {
          this.productId = id;
          this.reviewParams.PageSize = 100;
          this.reviewParams.ProductId = id
          return this.reviewService.getReviewns(this.reviewParams)
        })
      ).subscribe({
        next: (data) => this.reviewData = data
      })
  }

  addProduct(data : ProductData):void{
    this.dialog.open(ConfirmProductComponent,{
          closable: true,
          data: data,
          header: "¡Añadido a tu carro!",
          width : '30rem',
          height: '20rem'
        })
    this.shoppingCart.addProduct(data,this.quantity)
  }

  addProductRedirection(data:ProductData):void{
    this.shoppingCart.addProduct(data,this.quantity)
    this.router.navigateByUrl('/dashboard/shoppingCart')
  }

  receiveValue(quantity :number):void{
    this.quantity = quantity
  }

  recieveRefresh(state:boolean):void{
    this.getReviews();
  }

}
