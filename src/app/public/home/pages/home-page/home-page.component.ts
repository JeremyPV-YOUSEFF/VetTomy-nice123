import { Component, OnInit } from '@angular/core';
import { SliderImageComponent } from "../../../../shared/components/slider-image/slider-image.component";
import { SharedModule } from "../../../../shared/shared.module";
import { BussinessInformationComponent } from "../../components/bussiness-information/bussiness-information.component";
import { ListEmployeesComponent } from "../../components/list-employees/list-employees.component";
import { BusinessService } from '../../../../shared/services/business.service';
import { Business } from '../../../../shared/interfaces/business.interface';
import { EmployeeData, EmployeeParams } from '../../../../shared/interfaces/employee.interface';
import { EmployeeService } from '../../../../shared/services/employee.service';
import { SliderServiceComponent } from "../../components/slider-service/slider-service.component";
import { SliderProductComponent } from "../../components/slider-product/slider-product.component";
import { MapComponent } from "../../../../shared/components/map/map.component";
import { ChatBotComponent } from "../../../../shared/components/chat-bot/chat-bot.component";

@Component({
  imports: [SliderImageComponent, SharedModule, BussinessInformationComponent, ListEmployeesComponent, SliderServiceComponent, SliderProductComponent],
  templateUrl: './home-page.component.html',
  styles: ``
})
export default class HomePageComponent implements OnInit {

  public dataBusiness : Business | null = null
  public listEmployee : EmployeeData[] = []
  public employeeParams = new EmployeeParams()

  constructor (
    private bussiness : BusinessService,
    private employeeService : EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getInformationBusiness();
  }

  getInformationBusiness():void{
    this.bussiness.getBusiness()
      .subscribe({
        next: (data) => {
          this.dataBusiness = data
        }
      })
  }

  getEmployees():void{
    this.employeeParams.Type = 'Medico Veterinario'
    this.employeeService.getEmployees(this.employeeParams)
      .subscribe({
        next: (data) => {
          this.listEmployee = data.data
        }
      })
  }

}
