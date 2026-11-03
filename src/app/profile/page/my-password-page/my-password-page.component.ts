import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateFormsService } from '../../../shared/services/validate-forms.service';
import { NgIf } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { State } from '../../../shared/interfaces/state.interface';
import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../../shared/services/user.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ChangePasswordProfile, ChangePasswordProfileClass } from '../../../shared/interfaces/user.interface';
import { ToastService } from '../../../shared/alerts/toast.service';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-password-page',
  imports: [ReactiveFormsModule,NgIf,ToastModule],
  templateUrl: './my-password-page.component.html',
  styles: ``,
  providers: [
    DialogService,
    DynamicDialogRef
  ]
})
export class MyPasswordPageComponent {

  public state : State = ''
  public myForm : FormGroup
  public value : ChangePasswordProfile = new ChangePasswordProfileClass()

  constructor(
    private fb: FormBuilder,
    private validate : ValidateFormsService,
    public ref : DynamicDialogRef,
    public dialogService: DialogService,
    public userService : UserService,
    public auth :  AuthenticationService,
    private alert : ToastService,
    private router : Router
    
  ) {
    this.myForm = this.fb.group({
      oldPassword : ['',[Validators.required,Validators.minLength(5),Validators.maxLength(18)]],
      newPassword : ['',[Validators.required,Validators.minLength(5),Validators.maxLength(18)]],
      repassword  : ['',[Validators.required]]
    },
    {
      validators : [
        this.validate.fieldOneEqualFieldTwo('newPassword','repassword')
      ]
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

  openDialog():void{
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.state = 'Loading'
    this.ref = this.dialogService.open(ConfirmDialogComponent,{
      header: 'Confirmacion',
      closable :true,
      width : '25rem',
      height: "13rem",
    })
    this.ref.onClose.subscribe((data:boolean)=>{
      if (!data) {
        this.state = ''
        this.myForm.reset();
      }
      if (data) {
        if (this.recieveData ) {
          const {repassword, ...newValue} = this.myForm.value
          this.value = newValue
          this.value.userId = this.recieveData.userId
        }
        this.userService.changePassword(this.value).subscribe({
          next: () => {
            this.state = '';
            this.myForm.reset();
            this.alert.showSucces("Contraseña cambiada correctamente");
            setTimeout(() => {
              this.auth.logOut();
              this.router.navigateByUrl('/auth/sign-in');
            }, 3000);
          },error : () => {
            this.state = 'Error',
            this.alert.showError();
            setTimeout(() => {
              this.state = '';
            }, 3000);
          }
        })
      }
    })
  }

}
