import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppointmentData, SortAppointmentParams } from '../../../shared/interfaces/appointment.interface';
import { Paginate } from '../../../shared/interfaces/paginate.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'profile-filter-appointment',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './filter-appointment.component.html',
  styles: ``
})
export class FilterAppointmentComponent implements OnInit {

  public sendSort = output<SortAppointmentParams>();

  public sendPage = output<number>();

  public receiveAppointmentData = input<Paginate<AppointmentData>>();

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
    if (this.receiveAppointmentData()) {
      let page = this.receiveAppointmentData()!.currentPage
      page++
      if (page>this.receiveAppointmentData()!.totalPages) return;
      this.sendPage.emit(page)
    }
  }

  turnBackPage():void{
    if (this.receiveAppointmentData()) {
      let page = this.receiveAppointmentData()!.currentPage
      page--
      if (page < 1) return;
      this.sendPage.emit(page)
    }
  }

}
