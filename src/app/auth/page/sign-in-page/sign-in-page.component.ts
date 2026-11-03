import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidateFormsService } from '../../../shared/services/validate-forms.service';
import { ToastModule } from 'primeng/toast';
import { NgClass, NgIf } from '@angular/common';
import { State } from '../../../shared/interfaces/state.interface';
import { ButtonGoogleComponent } from "../../ui/button-google/button-google.component";
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ValidateEmailTokenClass } from '../../../shared/interfaces/token.interface';
import { ToastService } from '../../../shared/alerts/toast.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ForgetPasswordComponent } from '../../components/forget-password/forget-password.component';
import { ShowToastService } from '../../../shared/services/show-toast.service';

@Component({
  selector: 'app-sign-in-page',
  imports: [RouterLink, ToastModule, NgIf, NgClass, ReactiveFormsModule, ButtonGoogleComponent],
  templateUrl: './sign-in-page.component.html',
  styles: ``,
  providers: [
    DialogService,
  ]
})
export class SignInPageComponent implements OnInit {

  public myForm : FormGroup
  public state:  State = ''
  constructor(
    private fb :FormBuilder,
    private validate : ValidateFormsService,
    private authService : AuthenticationService,
    private router : Router,
    public dialogService: DialogService,
    private alert : ToastService,
    private showToast : ShowToastService
  ) {
    this.myForm = this.fb.group({
      email       : ['',[Validators.required,Validators.pattern(this.validate.emailPattern)]],
      password    : ['',[Validators.required,Validators.minLength(5)]], 
    })
  }

  ngOnInit(): void {
    this.emitToastFromChangePassword();
  }

  isValidField(field:string){
    return this.validate.isValidField(this.myForm, field);
  }

  getFieldError(field:string):string|null{
    return this.validate.getFieldError(this.myForm,field);
  }

  signIn():void{
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    };
    this.state = 'Loading'
    this.authService.signIn(this.myForm.value).subscribe({
      next: () => {
        this.state = "Success"
        this.alert.showSucces('Sesión iniciada correctamente');
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard/home')
        }, 3000);
      },
      error: () => {
        this.state = 'Error'
        this.alert.showError();
        this.myForm.reset();
        setTimeout(() => {
          this.state = ''
        }, 3000);
      }
    })
  }

  submitWithGoogle():void{
    this.state = 'Loading'
    this.authService.signInWithGoogle()
    .then(
      async (result) => {
        const data = result.user
        const idToken = await data.getIdToken();
        const newData = new ValidateEmailTokenClass(
          idToken
        )
        this.authService.validateTokenByGoogle(newData).subscribe({
          next: () => {
            this.state = 'Success'
            this.alert.showSucces('Sesión iniciada correctamente');
            setTimeout(() => {
              this.router.navigateByUrl('/dashboard/home')
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
    )
    .catch(()=>{
      this.state = 'Error'
      this.alert.showError();
      setTimeout(() => {
        this.state = ''
      }, 3000);
    });
  }

 openPopup():void{
  this.dialogService.open(ForgetPasswordComponent,{
    width: '30rem',
    height: '24rem',
  })
 }

 emitToastFromChangePassword(){
  this.showToast.onPopupClosed().subscribe(newState=> {
      this.alert.showSucces('Contraseña cambiada correctamente');
    })
  this.showToast.resertPopup();
 }

}
