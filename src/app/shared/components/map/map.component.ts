import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Address, AddressData } from '../../interfaces/address.interface';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateFormsService } from '../../services/validate-forms.service';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'shared-map',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './map.component.html',
  styles: ``
})

export class MapComponent implements OnInit {
  
  public addressData ?: Address
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef | null = null;
  map: google.maps.Map | null = null ;

  public direccion: string = '';
  public place : string = '';
  public myForm : FormGroup

  constructor(
    public config : DynamicDialogConfig,
    private fb : FormBuilder,
    private validate : ValidateFormsService,
    private addressService : AddressService,
    public ref : DynamicDialogRef
  ){
    this.myForm = this.fb.group({
      location :    [''],
      reference:    ['',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
    })
  }

  ngOnInit(): void {
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
        const placeId = results[0].place_id;
        this.direccion = direccionFormateada;
        this.place = placeId
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

  createAddress():void{
    if (this.myForm.invalid) {
      this.myForm.markAsTouched();
      return;
    }
    if (!this.addressData)return;
    const data = {...this.addressData}
    data.street = this.direccion;
    data.codeAddress = this.place
    data.reference = this.myForm.get('reference')?.value
    this.addressService.createAddress(data).subscribe({
      next: () => {
        this.ref.close(true)
      },error : () => {
        this.ref.close(false);
      }
    })
  }

}