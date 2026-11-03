import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { CounterStartComponent } from "../counter-start/counter-start.component";
import { Review } from '../../../../shared/interfaces/review.interface';
import { Paginate } from '../../../../shared/interfaces/paginate.interface';
@Component({
  selector: 'store-qualification-product',
  imports: [ProgressBarModule, CounterStartComponent],
  templateUrl: './qualification-product.component.html',
  styles: ``
})
export class QualificationProductComponent implements OnChanges {

  @Input() recieveReviewData : Paginate<Review> |  null = null

  public reviewData: Paginate<Review> | null = null
  public ratingNumber : number[] = [5,4,3,2,1]
  public countMap : {[key : number]: number} = {}
  public ratingGeneral : number = 0
  public max: number = 0;   
  public total : number = 0
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recieveReviewData']) {
      if (!this.recieveReviewData) return;
      this.reviewData = this.recieveReviewData
      this.max = this.recieveReviewData.totalItems
      this.ratingByStart(this.reviewData.data);
    }
  }

  calcRating(index: number):number{
    const percent = Math.round(this.countMap[index] / this.max * 100)
    return percent
  }

  ratingByStart(data : Review[]):void{
      this.total = 0
      this.ratingGeneral = 0
      if (data.length>0) {
        for (let i = 1; i <= 5; i++) {
          this.countMap[i] = 0;
        }
        data.forEach(element => {
          this.total +=  element.productRating 
          if (this.countMap[element.productRating] !== undefined) {
            this.countMap[element.productRating]++;
          }
        });
        this.ratingGeneral = Math.round((this.total/this.max)*10)/10
      }else{
        this.ratingGeneral = 0
      }
  }
  
}
