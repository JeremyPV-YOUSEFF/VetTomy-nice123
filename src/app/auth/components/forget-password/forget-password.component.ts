import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateFormsService } from '../../../shared/services/validate-forms.service';
import { EmailExistService } from '../../../shared/validators/email-exist.service';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { EmailValidService } from '../../../shared/validators/email-valid.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ValidateEmailComponent } from '../validate-email/validate-email.component';
import { State } from '../../../shared/interfaces/state.interface';
import { ResponseRegisterCustome } from '../../../shared/interfaces/register.interface';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,NgIf,NgClass],
  templateUrl: './forget-password.component.html',
  styles: ``
})
export class ForgetPasswordComponent {

  public myForm : FormGroup
  public state : State = ''

  constructor(
    public ref : DynamicDialogRef,
    private fb: FormBuilder,
    private validate : ValidateFormsService,
     private emailValid : EmailValidService,
     private auth : AuthenticationService,
     public dialogService: DialogService,
  ) {
    this.myForm = this.fb.group({
      email : ['',[Validators.required,Validators.pattern(this.validate.emailPattern)],[this.emailValid]]
    })
  }

  closeDialog(){
    this.ref.close();
  }

  isValidField(field:string){
    return this.validate.isValidField(this.myForm, field);
  }

  getFieldError(field:string):string|null{
    return this.validate.getFieldError(this.myForm,field);
  }

  sendEmail():void{
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.state = 'Loading'
    this.auth.sendEmail(this.myForm.value).subscribe({
      next: (data) => {
        this.state = 'Success'
        this.closeDialog();
        const new123  : ResponseRegisterCustome = {
          bannerId : 0,
          customerId : 0,
          email : data.email,
          emailVerificationId : data.emailVerificationId,
          personId : 0,
          type : 'changePassword',
          userId: 0
        }
        this.openDialog(new123)
      },error: (err) => {
        this.state = 'Error',
        setTimeout(() => {
          this.state = ''
        }, 3000);
      }
    })
  }

  openDialog(data:any):void{
    this.dialogService.open(ValidateEmailComponent,{
      width: '30rem',
      height: '25rem',
      modal: true,
      data: data
    })
  }

}
