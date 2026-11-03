import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoadingTextComponent } from '../../../../shared/components/loading-text/loading-text.component';
import { SharedModule } from 'primeng/api';
import { LoadingImageComponent } from '../../../../shared/components/loading-image/loading-image.component';
import { EmployeeData, EmployeeParams } from '../../../../shared/interfaces/employee.interface';
import { EmployeeService } from '../../../../shared/services/employee.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'home-list-employees',
  imports: [SharedModule,LoadingTextComponent,LoadingImageComponent,RouterLink],
  templateUrl: './list-employees.component.html',
  styles: ``
})
export class ListEmployeesComponent implements OnChanges {

  @Input() data : EmployeeData[] = []
  public listEmployee : EmployeeData[] = []
  public idEmployee : number = 120
  constructor (
    private employeeService : EmployeeService,
    private router : Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (!this.data) return;
      this.listEmployee = this.data
    }
  }

  onChangeState(num : number){
    this.idEmployee = num
  }

  goToPerfil():void{
    window.scrollTo(0,0)
  }

}
