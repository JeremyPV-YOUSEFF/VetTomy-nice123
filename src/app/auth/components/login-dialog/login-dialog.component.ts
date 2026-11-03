import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateFormsService } from '../../../shared/services/validate-forms.service';
import { State } from '../../../shared/interfaces/state.interface';
import { NgClass, NgIf } from '@angular/common';
import { ButtonGoogleComponent } from "../../ui/button-google/button-google.component";
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ValidateEmailTokenClass } from '../../../shared/interfaces/token.interface';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login-dialog',
  imports: [ReactiveFormsModule, NgClass, NgIf, ButtonGoogleComponent,RouterLink],
  templateUrl: './login-dialog.component.html',
  styles: ``
})
export class LoginDialogComponent {

  public state :  State = ''
  public myForm : FormGroup

  constructor(
    private fb :  FormBuilder,
    private validate : ValidateFormsService,
    private authService : AuthenticationService,
    public ref : DynamicDialogRef
  ) {
    this.myForm = this.fb.group({
      email       : ['',[Validators.required,Validators.pattern(this.validate.emailPattern)]],
      password    : ['',[Validators.required,Validators.minLength(5)]], 
    })
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
        this.ref.close(true);
      },
      error: () => {
        this.state = 'Error'
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
              this.ref.close(true);
            },
            error: () => {
              this.state = 'Error'
              setTimeout(() => {
                this.state = ''
              }, 3000);
            }
          })
        }
      )
      .catch(()=>{
        this.state = 'Error'
        setTimeout(() => {
          this.state = ''
        }, 3000);
      });
    }

}
