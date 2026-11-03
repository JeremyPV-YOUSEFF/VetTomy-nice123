import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateFormsService } from '../../../../shared/services/validate-forms.service';
import { PersonService } from '../../../../shared/services/person.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CreateAppointment } from '../../../../shared/interfaces/appointment.interface';
import { filter } from 'rxjs';
import { DniService } from '../../../../shared/services/dni.service';
import { ProductService } from '../../../../shared/services/product.service';
import { ProductData } from '../../../../shared/interfaces/product.interface';
import { LoadingImageComponent } from '../../../../shared/components/loading-image/loading-image.component';
import { CheckOutService } from '../../../../shared/services/check-out.service';
import { NewSaleService } from '../../../../shared/interfaces/sale.interface';
import { SaleService } from '../../../../shared/services/sale.service';
import { AppointmentService } from '../../../../shared/services/appointment.service';
import { RucExistService } from '../../../../shared/validators/ruc-exist.service';

type StateValidationService = 'Id' | 'Pay'

@Component({
  selector: 'app-validate-service',
  imports: [NgClass,NgIf,ReactiveFormsModule,CurrencyPipe,LoadingImageComponent],
  templateUrl: './validate-service.component.html',
  styles: ``
})
export class ValidateServiceComponent implements OnInit {

  public stateService : StateValidationService = 'Id'
  public myForm : FormGroup
  public receiveDataByComponent ?: CreateAppointment 
  public serviceData ?: ProductData
  public priceService : number = 10
  public isAllowedToGo : boolean = false

  constructor(
    private fb : FormBuilder,
    private validate : ValidateFormsService,
    private personService : PersonService,
    private auth :  AuthenticationService,
    public config : DynamicDialogConfig,
    private dniService : DniService,
    private productService : ProductService,
    private checkService : CheckOutService,
    private saleService : SaleService,
    private appointmentService : AppointmentService,
    private rucExist : RucExistService 
  ) {
    this.myForm = this.fb.group({
      name:             ['',[Validators.required,Validators.minLength(2),Validators.maxLength(18)]],
      lastName:         ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      documentNumber:   [  ,[Validators.required],[this.rucExist]],
      documentType :    ['DNI'],
      bussinessName:    [''],
      cellPhoneNumber:  ['',[Validators.required,Validators.pattern(this.validate.numberPattern),Validators.minLength(9),Validators.maxLength(9)]],
    },{
      validators : [
        this.validate.documentNumberValidator('documentType','documentNumber')
      ]
    })
    this.getBusinessName();
  }

  ngOnInit(): void {
    this.receiveDataByComponent = this.config.data
    this.getProduct();
    this.getPersonById();
  }

  get recieveData (){
    return this.auth.profileData
  }
  
  isValidField(field:string){
    return this.validate.isValidField(this.myForm, field);
  }

  getFieldError(field:string):string|null{
    return this.validate.getFieldError(this.myForm,field);
  }

  sendData():void{
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (!this.myForm.dirty) {
      this.stateService = 'Pay';
      return;
    }
    this.isAllowedToGo = true;
    this.stateService = 'Pay';
    
    if(!this.recieveData)return;
    this.personService.updatePerson(this.recieveData.id,this.myForm.value).subscribe({
      next: (data) => {
        this.myForm.patchValue(data);
      }
    })
  }

  getProduct():void{
    if (!this.receiveDataByComponent) return;
    this.productService.getProductById(this.receiveDataByComponent.serviceId).subscribe({
      next: (data) => {
        this.serviceData = data
      }
    })
  }

  getBusinessName():void{
      this.myForm.get('documentNumber')?.valueChanges
      .pipe(
         filter(x => !!x && x.length > 0),
        filter(x=>x.length==11))
      .subscribe((data)=>{
        this.dniService.getDataByRuc(data).subscribe({
          next: (data) => {
            this.myForm.patchValue({bussinessName:data.razonSocial})
          },error : (err) => {
          } 
        })
      })
    }

  getPersonById():void{
    if (!this.recieveData) return;
    this.personService.getPersonById(this.recieveData.id).subscribe({
      next: (data) => {
        this.myForm.reset(data)
      }
    })
  }

  onChangePage(data :  StateValidationService):void{
    if (data == 'Id') {
      this.stateService = 'Id'
    }else{
      if (!this.isAllowedToGo) {
        return;
      }else{
        this.stateService = 'Pay'
      }
    }
  }


  goToPay():void{
    if (!this.receiveDataByComponent) return;
    if (!this.serviceData) return;
    if (!this.recieveData) return;
      
      
    const newData : NewSaleService = {} as NewSaleService;
    newData.price = this.priceService,
    newData.serviceName = this.serviceData.name,
    newData.customerId = this.recieveData.customerId,
    newData.meansPayment = "Tarjeta"
    newData.serviceImage = this.serviceData.image[0].url
    newData.employeId = 1
    newData.serviceId = this.receiveDataByComponent.serviceId
    
    if (this.myForm.get('documentType')?.value == "DNI") {
      newData.receiptType = "Boleta" 
    }else{
      newData.receiptType = "Factura"
    }
    this.checkService.generateLinkAppointment(newData).subscribe({
      next: (data) => {
        window.location.href = data.url
        this.saleService.uploadSale(newData)
        this.appointmentService.uploadAppointment(this.receiveDataByComponent!)
      }
    })
  }

}
