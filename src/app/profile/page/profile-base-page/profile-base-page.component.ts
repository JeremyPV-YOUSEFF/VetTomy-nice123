import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { DataProfile, ProfileModel } from './mockup.profile';
import { CustomerData } from '../../../shared/interfaces/customer.interface';
import { CustomerService } from '../../../shared/services/customer.service';
import { BannerData, BannerService } from '../../../shared/services/banner.service';
import { LoadingImageComponent } from '../../../shared/components/loading-image/loading-image.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UploadImageComponent } from '../../components/upload-image/upload-image.component';
import { ToastService } from '../../../shared/alerts/toast.service';
import { ToastModule } from 'primeng/toast';

@Component({
  imports: [HeaderComponent,RouterOutlet,RouterLink,RouterLinkActive,LoadingImageComponent,ToastModule],
  templateUrl: './profile-base-page.component.html',
  styles: ``,
  styleUrl: './profile-base-page.component.css',
  providers: [
    DialogService
  ]
})
export class ProfileBasePageComponent implements OnInit {

  public profileData : ProfileModel[] = DataProfile
  public customerData : CustomerData = {} as CustomerData
  public ref : DynamicDialogRef | undefined;
  constructor(
    private auth : AuthenticationService,
    private router: Router,
    private customerService : CustomerService,
    public dialogService: DialogService,
    private alert : ToastService
  ) {
    
  }

  ngOnInit(): void {
    this.receiveData;
    this.getDataCustomer()
  }

  get receiveData() {
    return this.auth.profileData
  }

  logOut():void{
    this.auth.logOut();
    this.alert.showSucces('Sesion cerrada correctamente');
    setTimeout(() => {
      this.router.navigateByUrl('')
    }, 2000);
  }

  getDataCustomer():void{
    if (!this.receiveData) return;
    this.customerService.getCustomerById(this.receiveData.customerId).subscribe({
      next: (data) => {
        this.customerData = data
      }
    })
      
  }

  previewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event : Event){
    if (!this.customerData) return;
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
      
    const formData = new FormData()
    formData.append('file',file)
    
    let sendData : BannerData = {} as BannerData
    sendData.id = this.customerData.bannerId
    sendData.file = formData
    this.openPopup(sendData)
  }}

  openPopup(sendData : BannerData):void{
    this.ref = this.dialogService.open(UploadImageComponent,{
      width  : '20rem',
      height : '20rem',
      data : sendData
    })
    this.ref.onClose.subscribe((data)=>{
      if (data){
        this.alert.showSucces("Image subida correctamente")
        this.getDataCustomer();
      }
    })
  }

}
