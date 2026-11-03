import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputOtpModule } from 'primeng/inputotp';
import { ResponseRegisterCustome } from '../../../shared/interfaces/register.interface';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ValidateEmailClass } from '../../../shared/interfaces/email.interface';
import { State } from '../../../shared/interfaces/state.interface';
import { NgClass, NgIf } from '@angular/common';
import { VerificCodeRequestClass } from '../../../shared/interfaces/forgetPassword.interface';
import { ChangePasswordComponent } from '../change-password/change-password.component';


@Component({
  selector: 'auth-validate-email',
  imports: [InputOtpModule,FormsModule,NgClass,NgIf],
  templateUrl: './validate-email.component.html',
  styles: ``,
})
export class ValidateEmailComponent implements OnInit {

  public value : any
  public recieveData : ResponseRegisterCustome |null = null
  public state : State = ''

  constructor(
    public ref : DynamicDialogRef,
    public config : DynamicDialogConfig,
    public authService :  AuthenticationService,
     public dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.recieveData = this.config.data
  }

  verificationEmail():void{
    if (!this.recieveData) return;
    if (this.recieveData.type == 'validateEmial') {
      this.verificCodeByRegister(this.recieveData)
    }else{
      this.verificCodeByForget(this.recieveData)
    }
  }

  verificCodeByForget(res:any):void{
    const data  = new VerificCodeRequestClass(
      res.emailVerificationId,
      this.value,
    )
    this.authService.validCodeByEmail(data).subscribe({
      next: () => {
        this.openDialog();
        this.ref.close();
      },
      error: (err) => {
        this.value = ''
        this.state = 'Error',
        setTimeout(() => {
          this.state = ''
        }, 3000);
      }
    })
  }

  verificCodeByRegister(res: any ):void{
    this.state = 'Loading';
    const data = new ValidateEmailClass(
      this.value,
      res.emailVerificationId
    );
    this.authService.validateEmail(data).subscribe({
      next: () => {
        this.state = 'Success'
        setTimeout(() => {
          this.ref.close(true);
        }, 2000);
      },error: () => {
        this.value = ''
        this.state = 'Error';
        setTimeout(() => {
          this.state = ''
        }, 2000);
      }
    })
  }

  closeDialog():void{
    this.ref.close(false);
  }

  openDialog():void{
    this.dialogService.open(ChangePasswordComponent,{
      width: '30rem',
      height: '25rem',
      modal: true,
      data:this.recieveData
    })
  }
  
}
