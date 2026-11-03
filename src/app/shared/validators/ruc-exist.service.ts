import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DniService } from '../services/dni.service';

@Injectable({
  providedIn: 'root'
})
export class RucExistService implements AsyncValidator {

  constructor(private rucExistService : DniService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const ruc = control.value;
    if (!ruc) return of(null);
    if ( ruc == undefined) return of(null);
    if (ruc.length!=11) return of(null)
  const httpCallObservable = new Observable<ValidationErrors|null> ((suscriber)=> {
    if (ruc.length<0) return;
    this.rucExistService.getDataByRuc(ruc).subscribe((data) => {
      if (data.ruc) {
          suscriber.next(null);
        }else{
          suscriber.next({notExist:true})
        }
        suscriber.complete();
      })
    })
    return httpCallObservable
  }

}
