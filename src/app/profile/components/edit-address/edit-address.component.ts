import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Address, AddressCombine } from '../../../shared/interfaces/address.interface';
import { AddressService } from '../../../shared/services/address.service';
import { ValidateFormsService } from '../../../shared/services/validate-forms.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-address',
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './edit-address.component.html',
  styles: ``
})
export class EditAddressComponent {

  public addressData ?: Address
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef | null = null;
  map: google.maps.Map | null = null ;

  public direccion: string = '';
  public myForm : FormGroup

  public receiveAddress ?: AddressCombine

  constructor(
    public config : DynamicDialogConfig,
    private fb : FormBuilder,
    private validate : ValidateFormsService,
    private addressService : AddressService,
    public ref : DynamicDialogRef,
  ){
    this.myForm = this.fb.group({
      location :    [''],
      reference:    ['',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
    })
  }

  ngOnInit(): void {
    this.receiveAddress = this.config.data;

    this.addressData = this.config.data;

    if (!this.addressData) return;
    const address = `${this.addressData.street} ${this.addressData.streetNumber}, ${this.addressData.district}, ${this.addressData.region}, ${this.addressData.department}, Perú`;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (!results) return;
      if (status === 'OK' && results[0]) {
        
        if (!this.gmap) return;
        
        const valleMantaroBounds = {
          north: -11.6,   
          south: -12.3,    
          west: -75.5,
          east: -75.0
        };
        const valleMantaroCenter = {
          lat: (valleMantaroBounds.north + valleMantaroBounds.south) / 2,
          lng: (valleMantaroBounds.east + valleMantaroBounds.west) / 2
        };
        this.map = new google.maps.Map(this.gmap.nativeElement, {
          center : valleMantaroCenter, 
          zoom: 5,  
          restriction: {
          latLngBounds: valleMantaroBounds,
          strictBounds: true  
          }
        });
        
        const marker = new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location,
          draggable: true,
        });
        this.obtenerDireccion(results[0].geometry.location);
        marker.addListener('dragend', () => {
          const nuevaPosicion = marker.getPosition();
          if (nuevaPosicion) {
            this.obtenerDireccion(nuevaPosicion);
          } 
        });

      } else {
        alert('No se pudo encontrar la dirección');
      }
    });
  }

  obtenerDireccion(latLng: google.maps.LatLng | google.maps.LatLngLiteral) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (!results) return;
      if (status === 'OK' && results[0]) {
        const direccionFormateada = results[0].formatted_address;
        this.direccion = direccionFormateada;
        this.myForm.reset({...this.myForm, location : direccionFormateada})
      } else {
        this.direccion = 'No se pudo obtener la dirección';
      }
    });
  }

  isValidField(field:string){
    return this.validate.isValidField(this.myForm, field);
  }

  getFieldError(field:string):string|null{
    return this.validate.getFieldError(this.myForm,field);
  }

  editAddress():void{
    if (this.myForm.invalid) {
      this.myForm.markAsTouched();
      return;
    }
    if (!this.addressData)return;
    if (!this.receiveAddress) return;
      
    const data = {...this.addressData}
    data.street = this.direccion;
    data.reference = this.myForm.get('reference')?.value

    this.addressService.editAddress(this.receiveAddress.idAddress,data).subscribe({
      next: () => {
        this.ref.close(true)
      },error : () => {
        this.ref.close(false);
      }
    })
  }

}
