import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SaleService } from '../../../../shared/services/sale.service';
import { NewSaleService } from '../../../../shared/interfaces/sale.interface';
import { AppointmentService } from '../../../../shared/services/appointment.service';
import { CreateAppointment } from '../../../../shared/interfaces/appointment.interface';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { NubeFactRequest } from '../../../../shared/interfaces/nubeFact.interface';
import { NubeFactService } from '../../../../shared/services/nube-fact.service';

@Component({
  selector: 'app-confirm-service',
  imports: [RouterLink],
  templateUrl: './confirm-service.component.html',
  styles: ``
})
export class ConfirmServiceComponent implements OnInit { 

  public newSale ?: NewSaleService 
  public newAppointment ?: CreateAppointment

  constructor(
    private saleService : SaleService,
    private appointmentService : AppointmentService,
    private auth :  AuthenticationService,
    private nubeFact : NubeFactService
  ) {
    
  }

  ngOnInit(): void {
    this.recieveData
    this.saleService.newSaleValue.subscribe({
      next: (data) => {
        this.newSale = data;
      }
    })
    this.onnewSale();
    this.loadAppointment();
    this.createAppointment();
  }

  get recieveData (){
    return this.auth.profileData
  }


  loadAppointment():void{
    this.appointmentService.appointmentValue.subscribe({
      next: (data) => {
        this.newAppointment = data
      }
    })
  }

  onnewSale():void{
    if (!this.newSale) return;
    this.saleService.newSaleService(this.newSale).subscribe({
      next: (data) => {
        this.saleService.deleteSale();
        if (this.recieveData) {
          const newData : NubeFactRequest = {} as NubeFactRequest
          newData.idPerson = this.recieveData.id;
          newData.idSale = data.saleNumber
          this.nubeFact.newNubeFactByProduct(newData).subscribe({
          })
        }
      }
    })
  }

  createAppointment():void{
    if (!this.newAppointment) return;
    this.appointmentService.createAppointment(this.newAppointment).subscribe({
      next: (data) => {
        this.appointmentService.deleteAppointment();
      }
    })
  }

}
