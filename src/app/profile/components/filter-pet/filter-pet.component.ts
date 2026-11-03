import { Component, input, output } from '@angular/core';
import { PetData, PetSort } from '../../../shared/interfaces/pet.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Paginate } from '../../../shared/interfaces/paginate.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'profile-filter-pet',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './filter-pet.component.html',
  styles: ``
})
export class FilterPetComponent {

  public sendSort = output<PetSort>();

  public sendPage = output<number>();

  public receiveData = input<Paginate<PetData>>();

  public myForm : FormGroup


  constructor(
    private fb : FormBuilder
  ) {
    this.myForm = this.fb.group({
      sortBy : ['idDesc']
    })
  }

  ngOnInit(): void {
    this.changeSort();
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
    if (this.receiveData()) {
      let page = this.receiveData()!.currentPage
      page++
      if (page>this.receiveData()!.totalPages) return;
      this.sendPage.emit(page)
    }
  }

  turnBackPage():void{
    if (this.receiveData()) {
      let page = this.receiveData()!.currentPage
      page--
      if (page < 1) return;
      this.sendPage.emit(page)
    }
  }

}
