import { Component, EventEmitter, Output } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddressData, AddressParams } from '../../../../shared/interfaces/address.interface';
import { CreateAddressComponent } from '../../../../profile/components/create-address/create-address.component';
import { NgClass } from '@angular/common';
import { ToastService } from '../../../../shared/alerts/toast.service';
import { ToastModule } from 'primeng/toast';
import { AddressService } from '../../../../shared/services/address.service';

@Component({
  selector: 'app-my-address',
  imports: [NgClass,ToastModule],
  templateUrl: './my-address.component.html',
  styles: ``,
  providers: [
    DialogService
  ]
})
export class MyAddressComponent {

  public value : any
  public receiveData: AddressData[] = []
  public idAddress : number = 1
  public addressParams : AddressParams = new AddressParams();

  constructor(
    public ref : DynamicDialogRef,
    public config : DynamicDialogConfig,
    public dialogService: DialogService,
    private alert : ToastService,
    private addressService : AddressService,
  ) {
    
  }

  ngOnInit(): void {
    this.idAddress = this.config.data.idByList
    this.addressParams.PersonId = this.config.data.personId
    this.getAddress();
  }

  newAddress():void{
    this.ref = this.dialogService.open(CreateAddressComponent,{
      closable : true,
      header: 'Nueva dirección',
      width: '50rem',
      height: '30rem',
    })

    this.ref.onClose.subscribe((data)=> {
      if (!data) return;
      this.alert.showSucces('Direccion creada correctamente')
      this.getAddress();
    })
  }

  getAddress():void{
    this.addressService.generalAddress(this.addressParams).subscribe({
      next: (data) => {
        this.receiveData = data.data
      }
    })
  }

  onSelectAddress(id:number):void{
    this.idAddress = id;
  }

  editPopup(id:number):void{
    this.ref = this.dialogService.open(CreateAddressComponent,{
      closable : true,
      header: `Editar direccion`,
      width: '50rem',
      height: '35rem',
      data: id
    })

    this.ref.onClose.subscribe((data)=>{
      if (!data) return;
      this.alert.showSucces('Direccion editada correctamente')
      this.getAddress();
    })
  }



}
