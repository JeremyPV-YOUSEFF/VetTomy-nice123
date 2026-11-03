import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from '../../../../shared/services/product.service';
import { ProductData } from '../../../../shared/interfaces/product.interface';
import { NgClass, NgIf } from '@angular/common';
import { ValidateFormsService } from '../../../../shared/services/validate-forms.service';
import { State } from '../../../../shared/interfaces/state.interface';
import { ReviewService } from '../../../../shared/services/review.service';
import { ReviewDataClass } from '../../../../shared/interfaces/review.interface';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { ToastService } from '../../../../shared/alerts/toast.service';

@Component({
  selector: 'app-new-review',
  imports: [NgClass,ReactiveFormsModule,NgIf],
  templateUrl: './new-review.component.html',
  styles: ``
})
export class NewReviewComponent implements OnInit {

  public myForm : FormGroup
  public productData : ProductData | null = null
  public counterStart : number = 1
  public state:  State = ''
  public reviewData : ReviewDataClass = new ReviewDataClass();

  constructor(
    private fb : FormBuilder,
    private config : DynamicDialogConfig,
    private productService : ProductService,
    private reviewService : ReviewService,
    private validate : ValidateFormsService,
    private auth : AuthenticationService,
    private ref : DynamicDialogRef
  ) {
    this.myForm = this.fb.group({
        comment:       ['',[Validators.required,Validators.minLength(5),Validators.maxLength(70)]],
        state:         [],
        overallRating: [],
        productRating: [],
        productId:     [],
        customerId:    []
    })
  }

  ngOnInit(): void {
    this.profileData
    this.productService.getProductById(this.config.data).subscribe({
      next: (data) => {
        this.productData = data
      }
    })
  }

  get profileData (){
    return this.auth.profileData
  }

  setStart(num : number){
    this.counterStart = num;
  }
  
  isValidField(field:string){
    return this.validate.isValidField(this.myForm, field);
  }

  getFieldError(field:string):string|null{
    return this.validate.getFieldError(this.myForm,field);
  }

  newReview():void{
    this.state = 'Loading';

    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (!this.productData  ) return;
    if (!this.profileData) return;

    this.reviewData = this.myForm.value
    this.reviewData.productId = this.productData.id
    this.reviewData.productRating = this.counterStart
    this.reviewData.customerId = this.profileData.customerId
    this.reviewData.overallRating =1
    this.reviewData.state = true

    this.reviewService.createReview(this.reviewData).subscribe({
      next: () => {
        this.state = 'Success';
        this.ref.close(true)
      },
      error: (err) => {
        this.state = 'Error',
        setTimeout(() => {
          this.state = '';
        }, 3000);
      }
    })
  }


}
