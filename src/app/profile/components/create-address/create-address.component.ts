import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UbigeoService } from '../../../shared/services/ubigeo.service';
import { Department, District, Province } from '../../../shared/interfaces/ubigeo.interface';
import { filter, switchMap } from 'rxjs';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidateFormsService } from '../../../shared/services/validate-forms.service';
import { NgClass, NgIf } from '@angular/common';
import { AddressService } from '../../../shared/services/address.service';
import { Address, AddressCombine } from '../../../shared/interfaces/address.interface';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { State } from '../../../shared/interfaces/state.interface';
import { MapComponent } from '../../../shared/components/map/map.component';
import { EditAddressComponent } from '../edit-address/edit-address.component';

@Component({
  selector: 'app-create-address',
  imports: [ReactiveFormsModule,NgIf,NgClass],
  templateUrl: './create-address.component.html',
  styles: ``,
  providers: [
    DialogService
  ]
})
export class CreateAddressComponent {

  public myForm : FormGroup
  public departamentData : Department[] = []
  public provinceData : Province[] = []
  public districtData :  District[] = []
  public state : State = '';
  public idPerson : number = 0

  constructor(
    private fb : FormBuilder,
    private ubigeoService : UbigeoService,
    public ref : DynamicDialogRef<CreateAddressComponent>,
    public ref123 : DynamicDialogRef,
    public refsec : DynamicDialogRef,
    private validate : ValidateFormsService,
    private addressService : AddressService,
    private auth : AuthenticationService,
    public config : DynamicDialogConfig,
    public dialogService: DialogService
  ) {
    this.myForm = this.fb.group({
      department:   ['',[Validators.required]],
      region:       ['',[Validators.required]],
      district:     ['',[Validators.required]],
      street:       ['',[Validators.required,Validators.minLength(3),Validators.maxLength(45)]],
      /* reference:    ['',[Validators.minLength(3),Validators.maxLength(100)]], */
      streetNumber: ['',[Validators.required]],
    })
  }

  ngOnInit(): void {
    this.ubigeoService.getDepartments().subscribe({
      next: (data) => {
        this.departamentData = data.ubigeo_departamentos;
      } 
    })
    this.onProvinceChange();
    this.onDistricChange();
    this.recieveData;
    this.getAddress()
  }

  getAddress():void{
    if (!this.config.data) return;
    this.addressService.getAddressById(this.config.data).subscribe({
      next: (data) => {
        this.myForm.reset(data);
        this.idPerson = data.personId
      }
    })
  }


  updateAddress():void{
    this.state = ''
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const newAddress : Address = {...this.myForm.value}
    newAddress.personId = this.idPerson;

    const combine : AddressCombine = {...this.myForm.value} 
    combine.idAddress = this.config.data

    this.refsec = this.dialogService.open(EditAddressComponent, {
      width: '50%',
      height : '89%',
      data: combine,
      header : 'Confirmar direccion',
    })

    this.refsec.onClose.subscribe((data)=>{
      if (data) {
        this.ref.close(true)
      }else{
        this.ref.close(false)
      }
    })
    /* this.addressService.editAddress(this.config.data,newAddress).subscribe({
      next: () => {
        this.state = 'Success'
        this.ref.close(true);
      },error: () => {
        this.state = 'Error';
        setTimeout(() => {
          this.state = ''
        }, 3000);
      }
    }) */
  }

  get recieveData (){
    return this.auth.profileData
  }

  onProvinceChange():void{
    this.myForm.get('department')?.valueChanges.pipe(
      filter(x => x.length>0),
      switchMap((x)=> this.ubigeoService.getProvince(x))
    ).subscribe({
      next: (data) => {
        this.provinceData = data
      }
    })
  }

 
  onDistricChange():void{
    this.myForm.get('region')?.valueChanges.pipe(
      filter(x => x.length>0),
      switchMap((x)=> this.ubigeoService.getDistrict(x))
    ).subscribe({
      next: (data) => {
        this.districtData = data
      }
    })
  }

  onClose():void{
    this.ref.close()
  }

  isValidField(field:string){
    return this.validate.isValidField(this.myForm, field);
  }

  getFieldError(field:string):string|null{
    return this.validate.getFieldError(this.myForm,field);
  }

  onSubmit():void{
    this.state = ''
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (!this.recieveData) return;
    var newData : Address = {...this.myForm.value}
    newData.personId = this.recieveData.id
    if (newData.reference == '') {
      newData.reference = "Ninguna"
    }
    this.ref123 = this.dialogService.open(MapComponent,{
      width: '50%',
      height : '89%',
      data: newData,
      header : 'Confirmar direccion',
    })

    this.ref123.onClose.subscribe((data)=>{
      if (data) {
        this.ref.close(true);
      }else{
        this.ref.close(false)
      }
    })
  }

  
}
