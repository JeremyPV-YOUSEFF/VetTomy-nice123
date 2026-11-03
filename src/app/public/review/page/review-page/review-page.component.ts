import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../../shared/services/review.service';
import { Review, ReviewParams } from '../../../../shared/interfaces/review.interface';
import { RatingProductComponent } from "../../../store/components/rating-product/rating-product.component";
import { Paginate } from '../../../../shared/interfaces/paginate.interface';

@Component({
  selector: 'app-review-page',
  imports: [ RatingProductComponent],
  templateUrl: './review-page.component.html',
  styles: ``
})
export class ReviewPageComponent implements OnInit {

  public reviewParams: ReviewParams = new ReviewParams();
  public reviewData : Paginate<Review> | null = null;
  
  constructor(
    private reviewService :ReviewService
  ) {
    
  }

  ngOnInit(): void {
    this.reviewService.getReviewns(this.reviewParams)
      .subscribe({
        next: (data) => {
          this.reviewData = data
        }
      })
  }

}
