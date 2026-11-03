import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateFormsService } from '../../../shared/services/validate-forms.service';
import { NgClass, NgIf } from '@angular/common';
import { State } from '../../../shared/interfaces/state.interface';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ChangePasswordClass } from '../../../shared/interfaces/forgetPassword.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResponseRegisterCustome } from '../../../shared/interfaces/register.interface';
import { ShowToastService } from '../../../shared/services/show-toast.service';
import { ToastService } from '../../../shared/alerts/toast.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule,NgIf,NgClass,ToastModule],
  templateUrl: './change-password.component.html',
  styles: ``,
})
export class ChangePasswordComponent implements OnInit {

  public myForm : FormGroup
  public state : State = ''
  public recieveData : ResponseRegisterCustome |null = null

  constructor(
    private fb:FormBuilder,
    public ref : DynamicDialogRef,
    private validate : ValidateFormsService,
    private auth : AuthenticationService,
    public config : DynamicDialogConfig,
    public showToast : ShowToastService,
    private alert : ToastService,
  ) {
    this.myForm = this.fb.group({
      password   : ['',[Validators.required,Validators.minLength(5),Validators.maxLength(18)]],
      repassword : ['',[Validators.required]]
    },{
      validators : [
        this.validate.fieldOneEqualFieldTwo('password','repassword')
      ]
    })
  }

  ngOnInit(): void {
    this.recieveData = this.config.data
  }

  isValidField(field:string){
    return this.validate.isValidField(this.myForm, field);
  }

  getFieldError(field:string):string|null{
    return this.validate.getFieldError(this.myForm,field);
  }

  changePassword():void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (!this.recieveData) return;
    const data = {...this.myForm.value}
    delete data.repassword
    const newData = new ChangePasswordClass(
      this.recieveData.email,
      data.password
    )
    this.auth.changePassword(newData).subscribe({
      next: () => {
        this.ref.close();
        this.showToast.emitPopupClose();
      },
      error: () => {
        this.ref.close();
      }
    })
  }

  closeDialog():void{
    this.ref.close();
  }

}
