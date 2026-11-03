import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressData, AddressParams } from '../../../../shared/interfaces/address.interface';
import { AddressService } from '../../../../shared/services/address.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MyAddressComponent } from '../../components/my-address/my-address.component';
import { BranchService } from '../../../../shared/services/branch.service';
import { BranchData, BranchParams } from '../../../../shared/interfaces/branch.interface';
import { CreateAddressComponent } from '../../../../profile/components/create-address/create-address.component';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../../shared/alerts/toast.service';
import { SaleService } from '../../../../shared/services/sale.service';
import { SaleExtraData } from '../../../../shared/interfaces/sale.interface';
import { Router } from '@angular/router';
import { PaymentStepsService } from '../../../../shared/services/payment-steps.service';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';

interface AddressByCheckOut {
  idByList : number,
  personId : number
}

@Component({
  selector: 'app-delivery-page',
  imports: [ReactiveFormsModule,NgClass,NgIf,ToastModule,DatePipe],
  templateUrl: './delivery-page.component.html',
  styles: ``,
  providers: [
    DialogService
  ]
})
export class DeliveryPageComponent implements OnInit {

  value : number = 1;
  public addressData : AddressData[] = []
  public addressInformation : AddressData | undefined = undefined 
  public addressParams : AddressParams = new AddressParams()
  public ref : DynamicDialogRef | undefined;
  public branchData : BranchData[] = [];
  public idBranch : number = 1
  public currentDate : Date = new Date() 
  public sendData : SaleExtraData = new SaleExtraData();

  public branchParams = new BranchParams();

  public sendInformation : AddressByCheckOut = {idByList:0,personId:0}

  constructor(
    private addressService : AddressService,
    private auth : AuthenticationService,
    public dialogService: DialogService,
    public branchService : BranchService,
    private alert : ToastService,
    private saleService : SaleService,
    private router : Router,
    private paymenySteps : PaymentStepsService,
    private shoppingCart : ShoppingCartService
  ) {
  }

  ngOnInit(): void {
    this.getAddress();
    this.currentDate = new Date();
    this.getBranchs();
  }

  getAddress():void{
    if(!this.recieveData) return;
    this.addressParams.PersonId = this.recieveData.id;
    this.addressService.generalAddress(this.addressParams).subscribe({
      next: (data) => {
        this.addressData = data.data
        if (!this.addressInformation) {
          this.addressInformation = data.data[0]
          this.sendInformation.idByList = this.addressInformation?.id
        }
      }
    })
  }
  
  get recieveData (){
    return this.auth.profileData
  }

  onChangePage(id:number):void{
    this.value = id;
  }

  openListAddress():void{
    this.sendInformation.personId = this.addressParams.PersonId;

    this.ref = this.dialogService.open(MyAddressComponent,{
      header: 'Mis direcciones',
      width: '35rem',
      height: '30rem',
      closable : true,
      data: this.sendInformation
    })

    this.ref.onClose.subscribe((data)=>{
      if (!data) return;
      this.getAddress();
      const newValue = this.addressData.filter(x => x.id == data)
      this.addressInformation = newValue.shift()
    })
  }

  getBranchs():void{
    this.branchParams.Type = 'Centro Veterinario'
    this.branchService.generalBranch(this.branchParams).subscribe({
      next: (data) => {
        this.branchData = data.data
        this.idBranch = data.data[0].id
      }
    })
  }

  onChangeBranch(id:number):void{
    this.idBranch = id;
  }

  newAddress():void{
    this.ref = this.dialogService.open(CreateAddressComponent,{
      closable : true,
      header: 'Nueva dirección',
      width: '50rem',
      height: '35rem',
    })
    this.ref.onClose.subscribe((data)=> {
      if (!data) return
      this.alert.showSucces('Direccion creada correctamente');
      this.getAddress();
    })
  }

  get getDateDelivery(): Date {
    if(this.value == 1){
      const today = new Date();
      let deliveryDate = new Date(today);
      if (deliveryDate.getDay() === 6) {
        deliveryDate.setDate(deliveryDate.getDate()+3)
        return deliveryDate;
      }
      deliveryDate.setDate(deliveryDate.getDate() + 2); 
      if (deliveryDate.getDay() === 0) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
      }
      return deliveryDate;
    }else{
      const today = new Date();
      let deliveryDate = new Date(today);
      deliveryDate.setDate(deliveryDate.getDate() + 1); 
      if (deliveryDate.getDay() === 0) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
      }
      return deliveryDate;
    }
  }

  goToPay():void{
    const newDate = this.getDateDelivery.toISOString().split('T')[0]
    if (this.value == 1) {
      if (!this.addressInformation) return;
      this.sendData.addressId = this.addressInformation.id
      this.sendData.deliveryType = 'Delivery'
      this.shoppingCart.changeDeliveryPrice(8)
    }else{
      this.sendData.addressId = this.idBranch
      this.sendData.deliveryType = 'Retiro en tienda'
      this.shoppingCart.changeDeliveryPrice(0);
    }
    this.sendData.deliveryDate = newDate
    this.paymenySteps.validPayment()
    this.saleService.sendInformation(this.sendData)
    this.router.navigateByUrl('/dashboard/checkout/pay')
  }

}
