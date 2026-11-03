import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { AppointmentData, AppointmentParams, SortAppointmentParams } from '../../../shared/interfaces/appointment.interface';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ChangeTimePipe } from '../../../public/service/utils/change-time.pipe';
import { FilterAppointmentComponent } from "../../components/filter-appointment/filter-appointment.component";
import { Paginate } from '../../../shared/interfaces/paginate.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-my-appointment-page',
  imports: [ChangeTimePipe, FilterAppointmentComponent,NgClass],
  templateUrl: './my-appointment-page.component.html',
  styles: ``
})
export class MyAppointmentPageComponent implements OnInit {

  public appointmentData : AppointmentData[] = []
  public appointment ?: Paginate<AppointmentData>
  public appointmentParams : AppointmentParams = new AppointmentParams();

  constructor(
    private appointmetnService : AppointmentService,
    private auth : AuthenticationService
  ) {
    
  }

  ngOnInit(): void {
    this.receiveData
    if (this.receiveData) {
      this.appointmentParams.CustomerId = this.receiveData.customerId
    }
    this.getAppointments();
  }

  get receiveData (){
    return this.auth.profileData
  }

  getAppointments():void{
    if (this.receiveData) {
      this.appointmetnService.generalAppointments(this.appointmentParams).subscribe({
        next: (data) => {
          this.appointmentData = data.data
          this.appointment = data
        }
      })
    }
  }

  receiveChangeSort(data:SortAppointmentParams):void{
    this.appointmentParams.Sort = data;
    this.getAppointments();
  }
    
  receiveChangePage(page:number):void{
    this.appointmentParams.CurrentPage = page;
    this.getAppointments();
  }

}
