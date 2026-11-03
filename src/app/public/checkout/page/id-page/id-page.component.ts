import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { DniService } from '../../../../shared/services/dni.service';
import { ValidateFormsService } from '../../../../shared/services/validate-forms.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { PersonService } from '../../../../shared/services/person.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { PaymentStepsService } from '../../../../shared/services/payment-steps.service';
import { SaleService } from '../../../../shared/services/sale.service';
import { IReceiptType } from '../../../../shared/interfaces/sale.interface';

@Component({
  selector: 'app-id-page',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './id-page.component.html',
  styles: ``
})
export class IdPageComponent implements OnInit {

  public myForm : FormGroup

  constructor(
    private fb : FormBuilder,
    private dniService : DniService,
    private validate : ValidateFormsService,
    private router : Router,
    private personService : PersonService,
    private auth :  AuthenticationService,
    private paymentSteps : PaymentStepsService,
    private saleService : SaleService
  ) {
    this.myForm = this.fb.group({
      name:             ['',[Validators.required,Validators.minLength(2),Validators.maxLength(18)]],
      lastName:         ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      documentNumber:   [  ,[Validators.required]],
      documentType :    [''],
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
    this.recieveData;
    this.getPersonById();
  }

  getBusinessName():void{
    this.myForm.get('documentNumber')?.valueChanges
    .pipe(filter(x => !!x && x.length === 11))
    .subscribe((data)=>{
      this.dniService.getDataByRuc(data).subscribe({
        next: (data) => {
          if (data.success == false) {
            this.myForm.get('bussinessName')?.setErrors({bussinessNotValid:true})
          }else{
            this.myForm.get('bussinessName')?.setErrors(null)
            this.myForm.patchValue({bussinessName:data.razonSocial})
          }
        }
      })
    })
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

  sendData(){
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }  

    const data = this.myForm.get('documentType')?.value
    if (data == 'DNI') {
      this.saleService.changeReceiptType('Boleta')
    }else{
      this.saleService.changeReceiptType('Factura')
    }

    if (!this.myForm.dirty) {
       this.paymentSteps.validAddress();
      this.router.navigateByUrl('/dashboard/checkout/delivery')
      return;
    }
    
    this.personService.updatePerson(this.recieveData!.id,this.myForm.value).subscribe({
      next: (data) => {
        this.myForm.reset(data);
        return;
      },error : () => {
        return;
      }
    })
    
    this.paymentSteps.validAddress();
    this.router.navigateByUrl('/dashboard/checkout/delivery')
  }

  getPersonById():void{
    if (!this.recieveData) return;
    this.personService.getPersonById(this.recieveData.id).subscribe({
      next: (data) => {
        this.myForm.patchValue(data)
      }
    })
  }



}
