import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { AddressService } from '../../../shared/services/address.service';
import { Address, AddressData, AddressParams } from '../../../shared/interfaces/address.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateAddressComponent } from '../../components/create-address/create-address.component';
import { ToastService } from '../../../shared/alerts/toast.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-my-address-page',
  imports: [ToastModule],
  templateUrl: './my-address-page.component.html',
  styles: ``,
  providers: [
    DialogService
  ]
})
export class MyAddressPageComponent implements OnInit {

  public addressParams : AddressParams = new AddressParams()
  public addressData : AddressData[] = [];
  public ref : DynamicDialogRef | undefined;

  constructor(
    private addressService : AddressService,
    private auth :  AuthenticationService,
    public dialogService: DialogService,
    private alert : ToastService
  ) {
  }

  ngOnInit(): void {
    this.getAddress();
  }

  getAddress():void{
    this.recieveData
    if (!this.recieveData) return;
    this.addressParams.PersonId = this.recieveData.id
    this.addressService.generalAddress(this.addressParams).subscribe({
      next: (data) => {
        this.addressData = data.data
      }
    })
  }

  get recieveData (){
    return this.auth.profileData
  }

  openPopup():void{
    this.ref = this.dialogService.open(CreateAddressComponent,{
      closable : true,
      header: 'Nueva dirección',
      width: '50rem',
      height: '30rem',
    })
    this.ref.onClose.subscribe((data)=> {
      if (!data) return
      this.alert.showSucces('Direccion creada correctamente');
      this.getAddress();
    })
  }

  editPopup(id:number):void{
    this.ref = this.dialogService.open(CreateAddressComponent,{
      closable : true,
      header: `Editar direccion`,
      width: '50rem',
      height: '30rem',
      data: id  
    })
    this.ref.onClose.subscribe((data)=> {
      if (!data) return
      this.alert.showSucces('Direccion editada correctamente');
    })
  }

}
