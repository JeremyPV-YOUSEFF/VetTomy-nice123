import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, take, tap } from 'rxjs';
import { District, Province, UbigeoDepartment, UbigeoProvince } from '../interfaces/ubigeo.interface';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  private service = './assets/ubigeos'

  constructor(private htpp: HttpClient) { }

  getDepartments():Observable<UbigeoDepartment>{
    return this.htpp.get<UbigeoDepartment>(`${this.service}/1_ubigeo_departamentos.json`)
  }

  getProvince(name:string):Observable<Province[]>{
    	return this.htpp.get<Province[]>(`${this.service}/2_ubigeo_provincias.json`).pipe(
        map ( y => y.filter(x => x.departamento == name))
      )
  }

  getDistrict(name:string):Observable<District[]>{
    return this.htpp.get<District[]>(`${this.service}/3_ubigeo_distritos.json`).pipe(
      map ( y =>  y.filter(x => x.provincia == name))
    )
  }
  
}
