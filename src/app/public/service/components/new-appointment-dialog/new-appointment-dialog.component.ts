import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, forkJoin } from 'rxjs';
import { EmployeeService } from '../../../../shared/services/employee.service';
import { EmployeeData, EmployeeParams } from '../../../../shared/interfaces/employee.interface';
import { ScheduleService } from '../../../../shared/services/schedule.service';
import { ScheduleData, ScheduleParams } from '../../../../shared/interfaces/schedule.interface';
import { ProductService } from '../../../../shared/services/product.service';
import { ProductData, ProductParams } from '../../../../shared/interfaces/product.interface';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { PetData, PetParams } from '../../../../shared/interfaces/pet.interface';
import { PetService } from '../../../../shared/services/pet.service';
import { BranchData, BranchParams } from '../../../../shared/interfaces/branch.interface';
import { BranchService } from '../../../../shared/services/branch.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateAppointmentClass } from '../../../../shared/interfaces/appointment.interface';
import { State } from '../../../../shared/interfaces/state.interface';
import { AppointmentService } from '../../../../shared/services/appointment.service';
import { NgClass, NgIf } from '@angular/common';
import { ChangeTimePipe } from '../../utils/change-time.pipe';
import { ValidateFormsService } from '../../../../shared/services/validate-forms.service';
import { ValidateServiceComponent } from '../validate-service/validate-service.component';
@Component({
  selector: 'app-new-appointment-dialog',
  imports: [ReactiveFormsModule,NgClass,NgIf,ChangeTimePipe],
  templateUrl: './new-appointment-dialog.component.html',
  styles: ``,
  providers: [
    DialogService
  ]
})
export class NewAppointmentDialogComponent implements OnInit {

  public state: State = ''
  public myForm : FormGroup
  public employeeParams : EmployeeParams = new EmployeeParams();
  public employeeData : EmployeeData[] = []

  public scheduleParams : ScheduleParams = new ScheduleParams();
  public scheduleData : ScheduleData[] = []

  public productData : ProductData[] = []
  public productParams : ProductParams = new ProductParams();

  public petData : PetData[] = []
  public petParams : PetParams = new PetParams();

  public branchData : BranchData[] = []
  public branchParams = new BranchParams();

  public appointmentData : CreateAppointmentClass = new CreateAppointmentClass()

  public minDate : string = ''
  public maxDate : string = ''

  constructor(
    private fb : FormBuilder,
    private employeeService : EmployeeService,
    private scheduleService : ScheduleService,
    private productService : ProductService,
    private auth :  AuthenticationService,
    private petService : PetService,
    private branchService : BranchService,
    public ref : DynamicDialogRef,
    public dialogService: DialogService,
    public appointmentService : AppointmentService,
    private validate : ValidateFormsService,
  ) {
    this.myForm = this.fb.group({
      date      : ['' ,[Validators.required,validate.onValidSunday]],
      employeId : [0  ,[Validators.required,validate.notZeroValidator]],
      serviceId : [0  ,[Validators.required,validate.notZeroValidator]],
      branchId  : [0  ,[Validators.required,validate.notZeroValidator]],
      petId     : [0  ,[Validators.required,validate.notZeroValidator]],
      scheduleId: [0  ,[Validators.required,validate.notZeroValidator]],
      reason    : ['',[Validators.maxLength(100)]]
    })
  }

  ngOnInit(): void {
    this.recieveData

    this.employeeParams.Type = 'Medico Veterinario'
    const employee = this.employeeService.getEmployees(this.employeeParams)

    this.productParams.Type = 'Servicio'
    const service = this.productService.getProducts(this.productParams)

    if (this.recieveData) {
      this.petParams.CustomerId = this.recieveData.customerId
    }
    const pet = this.petService.generalPets(this.petParams)
    
    this.branchParams.Type = 'Centro Veterinario'
    const branch = this.branchService.generalBranch(this.branchParams);

    forkJoin([employee,service,pet,branch]).subscribe(
      ([response1,response2,response3,response4]) => {
        this.employeeData = response1.data,
        this.productData = response2.data
        this.petData = response3.data
        this.branchData = response4.data
      }
    )
    this.getValueDate();
    const currentDate = new Date()
    const convertDate = currentDate.toISOString().split('T')[0]

    const maxDateValue = new Date()
    maxDateValue.setDate(maxDateValue.getDate()+14)
    const change = maxDateValue.toISOString().split('T')[0]
    
    this.minDate = convertDate
    this.maxDate = change
  }

  closePopup():void{
    this.ref.close(false);
  }

  onSubmit():void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if (!this.recieveData) return;
      

    const {...newValue} = this.myForm.value
    this.appointmentData = newValue
    this.appointmentData.customerId = this.recieveData.customerId

    this.ref = this.dialogService.open(ValidateServiceComponent,{
      width: '85%',
      height: '88%',
      closable : true,
      data : this.appointmentData
    })

    /* this.state = 'Loading'
    if (this.recieveData) {
      const {...newValue} = this.myForm.value
      this.appointmentData = newValue
      this.appointmentData.customerId = this.recieveData?.customerId
      this.appointmentService.createAppointment(this.appointmentData).subscribe({
        next: () => {
          this.ref.close(true);
          this.state = '';
        },error: () => {
          this.state = 'Error',
          setTimeout(() => {
            this.state = '';
          }, 3000);
        }
      })
    } */
  }

  get recieveData (){
    return this.auth.profileData
  }

  getValueDate(): void {
    const dateControl = this.myForm.get('date');
    const employeIdControl = this.myForm.get('employeId');
    if (dateControl && employeIdControl) {
      combineLatest([
        dateControl.valueChanges,
        employeIdControl.valueChanges
      ]).subscribe(([value1, value2]) => {
        this.scheduleParams.Date = value1;
        this.scheduleParams.EmployeeId = value2;
        this.scheduleService.getSchedules(this.scheduleParams).subscribe({
          next: (data) => this.scheduleData = data.data
        })
      });
    }
  }

  isValidField(field:string){
    return this.validate.isValidField(this.myForm, field);
  }

  getFieldError(field:string):string|null{
    return this.validate.getFieldError(this.myForm,field);
  }
  

}
