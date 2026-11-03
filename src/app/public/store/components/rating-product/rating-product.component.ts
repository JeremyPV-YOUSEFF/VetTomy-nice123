import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Review, ReviewParams, sortReview } from '../../../../shared/interfaces/review.interface';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
import { DatePipe, NgIf } from '@angular/common';
import { LoadingImageComponent } from '../../../../shared/components/loading-image/loading-image.component';
import { ReviewService } from '../../../../shared/services/review.service';
import { QualificationProductComponent } from "../qualification-product/qualification-product.component";
import { CounterStartComponent } from "../counter-start/counter-start.component";
import { FilterReviewComponent } from "../filter-review/filter-review.component";
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from '../../../../shared/alerts/toast.service';
import { LoginDialogComponent } from '../../../../auth/components/login-dialog/login-dialog.component';
import { NewReviewComponent } from '../../../review/components/new-review/new-review.component';
import { ToastModule } from 'primeng/toast';

export type ITypeRatingProducts = ''|'productDetails'|'review';

@Component({
  selector: 'store-rating-product',
  imports: [DatePipe, LoadingImageComponent, QualificationProductComponent, CounterStartComponent, FilterReviewComponent,NgIf,ToastModule],
  templateUrl: './rating-product.component.html',
  styles: ``,
  providers: [
    DialogService,
    DynamicDialogRef
  ]
})

export class RatingProductComponent implements OnChanges {

  @Input() type : ITypeRatingProducts = ''
  @Input() reviewData : Paginate<Review> | null = null
  @Input() productId :  number | null = null
  
  @Output() refresh : EventEmitter<boolean> = new EventEmitter<boolean>();

  public sendReviewData : Paginate<Review> | null = null
  public todayDate : Date = new Date()
  public reviewList : Review[] = []
  public reviewParams : ReviewParams = new ReviewParams();

  constructor(
    private reviewService : ReviewService,
    private auth :  AuthenticationService,
    public dialogService: DialogService,
    public ref : DynamicDialogRef,
    private alert : ToastService,
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reviewData']) {
      if (this.reviewData) {
        this.sendReviewData = this.reviewData;
      } 
    }
    if (changes['productId']) {
      if(this.productId){
        if (this.type == 'productDetails') {
          this.reviewParams.ProductId =  this.productId;
        }
        this.getReview()
      }
    }else{
      this.getReview()
    }
  }

  getReview():void{
    this.reviewService.getReviewns(this.reviewParams)
      .subscribe({
        next: (data) => {
          this.reviewList = data.data
        }
      })
  }

  get receiveData (){
    return this.auth.profileData
  }

  receiveFilter(data:sortReview):void{
    this.reviewParams.Sort = data
    this.getReview();
  }

  receiveRaitingStar(data:number):void{
    this.reviewParams.ProductRating = data
    this.getReview();
  }

  newReview():void{
    if (this.receiveData) {
      this.ref = this.dialogService.open(NewReviewComponent,{
        closable: true,
        header: 'Nueva reseña',
        data: this.productId,
        height: '32rem',
        width: '30%'
      })
      this.ref.onClose.subscribe((data:boolean)=>{
        if (data) {
          this.alert.showSucces("Comentario creado correctamente")
          this.getReview();
          this.refresh.emit(true);
        }
      })
    }
    else{
      this.ref = this.dialogService.open(LoginDialogComponent,{
        header: 'Para reservar una cita, primero necesitas Iniciar Sesión',
        closable : true,
        width: '25rem',
        height: '32rem' 
      })
      this.ref.onClose.subscribe((data:boolean)=>{
        if (data) {
          this.alert.showSucces("Sesion iniciada correctamente")
        }
      })
    }
  }


}
