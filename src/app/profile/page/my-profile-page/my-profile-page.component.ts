import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonService } from '../../../shared/services/person.service';
import { UserAppProfile } from '../../../shared/interfaces/sign-up.interface';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ValidateFormsService } from '../../../shared/services/validate-forms.service';
import { NgClass, NgIf } from '@angular/common';
import { State } from '../../../shared/interfaces/state.interface';
import { ToastService } from '../../../shared/alerts/toast.service';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-my-profile-page',
  imports: [ReactiveFormsModule,NgIf,NgClass,ToastModule],
  templateUrl: './my-profile-page.component.html',
  styles: ``,
  providers: [
    DialogService,
    DynamicDialogRef
  ]
})
export class MyProfilePageComponent implements OnInit {
  
  public state : State = ''
  public myForm : FormGroup
  constructor(
    private fb : FormBuilder,
    private personService : PersonService,
    public ref : DynamicDialogRef,
    public dialogService: DialogService,
    private auth :  AuthenticationService,
    private validate : ValidateFormsService,
    private alert : ToastService,
  ) {
    this.myForm = this.fb.group({
      name:             ['',[Validators.required,Validators.minLength(2),Validators.maxLength(18)]],
      lastName:         ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30)]],
      cellPhoneNumber:  ['',[Validators.required,Validators.pattern(this.validate.numberPattern),Validators.minLength(9),Validators.maxLength(9)]],
      documentType:     ['',[]],
      documentNumber:   ['',[Validators.required]],
      bussinessName:    ['',[]],
      birthday:         ['',[Validators.required]],
    },{
      validators : [
        this.validate.documentNumberValidator('documentType','documentNumber')
      ]
    })
  }

  ngOnInit(): void {
    this.completeForm()
  }

  completeForm():void{
    this.recieveData
    if (this.recieveData) {
      this.personService.getPersonById(this.recieveData.id).subscribe({
        next: (data) => this.myForm.reset(data)
      })
    }
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
      this.myForm.markAllAsTouched()
      return;
    }
    this.state = 'Loading'
    if (!this.myForm.dirty) {
      this.state = ''
      return;
    }
    this.ref = this.dialogService.open(ConfirmDialogComponent,{
      header: 'Confirmacion',
      closable :true,
      width : '25rem',
      height: "13rem",
    })
    this.ref.onClose.subscribe((data:boolean) => {
      if (!data) {
        this.state = '';
        this.completeForm();
      }
      if (data && this.recieveData ) {
        this.personService.updatePerson(this.recieveData.id,this.myForm.value).subscribe({
          next: () => {
            this.state = '';
            this.alert.showSucces('Campo actualizado correctamente')
          },
          error: () => {
            this.state = 'Error'
            this.alert.showError();
            setTimeout(() => {
              this.state = '';
              this.completeForm();
            }, 3000);
          } 
        })
      }
    })
  }

}
