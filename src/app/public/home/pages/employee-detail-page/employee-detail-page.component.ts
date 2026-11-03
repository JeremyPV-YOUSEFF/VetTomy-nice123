import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { EmployeeData } from '../../../../shared/interfaces/employee.interface';
import { EmployeeService } from '../../../../shared/services/employee.service';
import { SharedModule } from 'primeng/api';
import { LoadingImageComponent } from '../../../../shared/components/loading-image/loading-image.component';
import { LoadingTextComponent } from '../../../../shared/components/loading-text/loading-text.component';

@Component({
  selector: 'app-employee-detail-page',
  imports: [LoadingImageComponent,LoadingTextComponent,RouterLink],
  templateUrl: './employee-detail-page.component.html',
  styles: ``
})
export class EmployeeDetailPageComponent {

  public employeeData : EmployeeData | null = null

  constructor (
    private activatedRouter : ActivatedRoute,
    private employeeService : EmployeeService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params
      .pipe(
        switchMap(({id})=> this.employeeService.getEmployeeById(id))
      )
      .subscribe({
        next: (data) => {
          if (!data) return;  
          this.employeeData = data
          }
      })
  }

}
