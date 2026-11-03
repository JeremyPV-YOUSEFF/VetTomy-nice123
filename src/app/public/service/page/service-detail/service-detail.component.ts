import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductData } from '../../../../shared/interfaces/product.interface';
import { ProductService } from '../../../../shared/services/product.service';
import { LoadingImageComponent } from '../../../../shared/components/loading-image/loading-image.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from '../../../../shared/alerts/toast.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { NewAppointmentDialogComponent } from '../../components/new-appointment-dialog/new-appointment-dialog.component';
import { LoginDialogComponent } from '../../../../auth/components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-service-detail',
  imports: [LoadingImageComponent],
  templateUrl: './service-detail.component.html',
  styles: ``,
  providers : [
    DialogService,
    DynamicDialogRef
  ]
})
export class ServiceDetailComponent implements OnInit {

  public serviceData : ProductData | null = null

  constructor(
    private service : ProductService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    public dialogService: DialogService,
    public ref : DynamicDialogRef,
    private alert : ToastService,
    private auth :  AuthenticationService,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.service.getProductById(id))
      )
      .subscribe({
        next: (data) => this.serviceData = data
      })
    this.receiveData;
  }

  get receiveData (){
    return this.auth.profileData
  }

  navigate(){
    this.router.navigateByUrl('/dashboard/service')
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
          height: '35rem' 
        })
        this.ref.onClose.subscribe((data:boolean)=>{
          if (data) {
            this.alert.showSucces("Sesion iniciada correctamente")
          }
        })
      }
    }

}
