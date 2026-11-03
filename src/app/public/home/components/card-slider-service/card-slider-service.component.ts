import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductData } from '../../../../shared/interfaces/product.interface';
import { ProductService } from '../../../../shared/services/product.service';
import { LoadingImageComponent } from '../../../../shared/components/loading-image/loading-image.component';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { LoginDialogComponent } from '../../../../auth/components/login-dialog/login-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from '../../../../shared/alerts/toast.service';
import { ToastModule } from 'primeng/toast';
import { NewAppointmentDialogComponent } from '../../../service/components/new-appointment-dialog/new-appointment-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'home-card-slider-service',
  imports: [LoadingImageComponent,ToastModule],
  templateUrl: './card-slider-service.component.html',
  styles: ``,
  providers: [
    DialogService,
    DynamicDialogRef
  ]

})
export class CardSliderServiceComponent implements OnChanges, OnInit {
  @Input() idService : number  | null  = null
  public productData : ProductData | null = null
  
  constructor(
    private productService : ProductService,
    private auth :  AuthenticationService,
    public dialogService: DialogService,
    public ref : DynamicDialogRef,
    private alert : ToastService,
    private router : Router
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idService']) {
      if(!this.idService) return ;
      this.productService.getProductById(this.idService)
      .subscribe({
        next: (data) => this.productData = data
      })
    }
  }

  ngOnInit(): void {
    this.receiveData
  }

  get receiveData (){
    return this.auth.profileData
  }


  newAppointment():void{
    
    if (this.receiveData) {
      this.ref = this.dialogService.open(NewAppointmentDialogComponent,{
        height: '54rem',
        width: '90%'
      })
      this.ref.onClose.subscribe((data:boolean)=>{
        if (data) {
          this.alert.showSucces("Cita creada correctamente")
          setTimeout(() => {
            this.router.navigateByUrl('/profile/myAppointment')
          }, 3000);
        }
      })
    }else{
      this.ref = this.dialogService.open(LoginDialogComponent,{
        header: 'Para reservar una cita, primero necesitas Iniciar Sesión',
        closable : true,
        width: '25rem',
        height: '32rem' 
      })
      this.ref.onClose.subscribe((data:boolean)=>{
        if (data) {
          this.alert.showSucces("Sesion iniciada correctamente")
        }
      })
    }
  }

}
