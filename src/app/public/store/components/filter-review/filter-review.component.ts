import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { listSortReview, dataListSortReview } from './review.mockup';
import { sortReview } from '../../../../shared/interfaces/review.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'store-filter-review',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './filter-review.component.html',
  styles: ``
})
export class FilterReviewComponent implements OnInit {

  @Output() sendFilter : EventEmitter<sortReview> = new EventEmitter<sortReview>();
  @Output() sendRatingStar : EventEmitter<number> = new EventEmitter<number>();

  public myForm : FormGroup
  public dataSort : listSortReview[] = dataListSortReview
  
  constructor(
    private fb: FormBuilder
  ){
    this.myForm = this.fb.group({
      filter: [''],
      ratingStar: ['']
    })
  }

  ngOnInit(): void {
    this.getValueByFilter();
    this.getRatingStar();
  }

  getValueByFilter():void{
    this.myForm.get('filter')?.valueChanges.subscribe((data)=>{
      this.sendFilter.emit(data);
    })
  }

  getRatingStar():void{
    this.myForm.get('ratingStar')?.valueChanges.subscribe((data)=>{
      this.sendRatingStar.emit(data);
    })
  }

  restartFilter():void{
    this.myForm.reset({ratingStar:'',filter:''});
  }

}
