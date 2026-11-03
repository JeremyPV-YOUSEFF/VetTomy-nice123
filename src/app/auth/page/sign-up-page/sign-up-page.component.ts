import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ValidateFormsService } from '../../../shared/services/validate-forms.service';
import { NgClass, NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputOtpModule } from 'primeng/inputotp';
import { ResponseRegisterCustome } from '../../../shared/interfaces/register.interface';
import { ToastService } from '../../../shared/alerts/toast.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateEmailComponent } from '../../components/validate-email/validate-email.component';
import { State } from '../../../shared/interfaces/state.interface';
import { ToastModule } from 'primeng/toast';
import { EmailExistService } from '../../../shared/validators/email-exist.service';
import { ButtonGoogleComponent } from "../../ui/button-google/button-google.component";
import { ValidateEmailTokenClass } from '../../../shared/interfaces/token.interface';

@Component({
  selector: 'app-sign-up-page',
  imports: [RouterLink, ReactiveFormsModule, NgIf, DialogModule, InputOtpModule, NgClass, ToastModule, ButtonGoogleComponent],
  templateUrl: './sign-up-page.component.html',
  styles: ``,
  providers : [
    DialogService,
  ]
})
export class SignUpPageComponent {

  public myForm : FormGroup
  public responseCustomer : ResponseRegisterCustome | null = null
  public ref : DynamicDialogRef | undefined;
  public state : State = ''

  constructor(
    private fb: FormBuilder,
    private authSerrvice : AuthenticationService,
    private validate : ValidateFormsService,
    public dialogService: DialogService,
    private alert : ToastService,
    private router : Router,
    private emailExist : EmailExistService
  ) {
    this.myForm = this.fb.group({
      name        : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(28),Validators.pattern(this.validate.namePattern)]],
      lastName    : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(17),Validators.pattern(this.validate.namePattern)]],
      email       : ['',[Validators.required,Validators.pattern(this.validate.emailPattern)],[this.emailExist]],
      password    : ['',[Validators.required,Validators.minLength(5),Validators.maxLength(18)]],
      repassword  : ['',[Validators.required]]
    },{
      validators : [
        this.validate.fieldOneEqualFieldTwo('password','repassword')
      ]
    })
  }

  openDialog():void{
    this.ref = this.dialogService.open(ValidateEmailComponent,{
      width: '30rem',
      height: '25rem',
      modal: true,
      data : this.responseCustomer 
    })

    this.ref.onClose.pipe(
    ).subscribe({next: (data)=>{
      if (!data) {
        this.myForm.reset();
        this.alert.showError();
        this.state = ''
        return;
      }
      this.registerCustomer();
      
    }})
  }

  register():void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.state = 'Loading'
    const data = {...this.myForm.value}
    delete data.repassword
    this.authSerrvice.sendEmailVerficate(data).subscribe({
      next: (data) => {
        const new123 : ResponseRegisterCustome = {
          bannerId : 0,
          customerId :0,
          email : '',
          emailVerificationId : data.emailVerificationId,
          personId : 0,
          type : 'validateEmial',
          userId : 0
        }
        this.responseCustomer = new123
        this.openDialog();
      }
    })
  }

  registerCustomer():void{
    const data = {...this.myForm.value}
    delete data.repassword
    this.authSerrvice.registerCustome(data).subscribe({
      next: (data) => {
        this.state = 'Success'
        this.myForm.reset();
        this.alert.showSucces('Registro creado correctamente');
        setTimeout(() => {
          this.router.navigateByUrl('/auth/sign-in')
        }, 3000);
      },error : () => {
        this.state = 'Error'
        this.myForm.reset();
        this.alert.showError();
        setTimeout(() => {
          this.state = ''
        }, 3000);
      }
    })
  }

  isValidField(field:string){
    return this.validate.isValidField(this.myForm, field);
  }

  getFieldError(field:string):string|null{
    return this.validate.getFieldError(this.myForm,field);
  }

  registerByGoogle():void{
    this.authSerrvice.signInWithGoogle()
      .then(
        async (result) => {
          const data = result.user
          const idToken = await data.getIdToken();
          const newData = new ValidateEmailTokenClass(
            idToken
          )
          this.authSerrvice.validateTokenByGoogle(newData).subscribe({
            next: (data) => {
              this.state = 'Success';
              this.alert.showSucces('Cuenta creada correctamente'),
              setTimeout(() => {
                this.state = '';
                this.router.navigateByUrl('/auth/sign-in')
              }, 3000);
            },
            error: () => {
              this.state = 'Error'
              this.alert.showError();
              setTimeout(() => {
                this.state = ''
              }, 3000);
            }
          })
        }
      ).catch((err) => {
        this.state = 'Error'
        setTimeout(() => {
          this.state = ''
        }, 3000);
      })
  }
  

}
