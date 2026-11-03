import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { DontRepeatEmailClass } from '../interfaces/emailExits.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailValidService implements AsyncValidator {

  constructor(private auth : AuthenticationService) { }
  
  validate(control: AbstractControl): Observable<ValidationErrors | null>{
    const email = control.value;
    const data = new DontRepeatEmailClass(
      email
    )
    const httpCallObservable = new Observable<ValidationErrors | null> ((suscriber)=>{
      if (data.email.length<0) return;
      this.auth.emailExist(data).subscribe((data)=> {
        if (data.valid) {
          suscriber.next({emailExist:true});
          suscriber.complete();
        }else{
          suscriber.next(null);
          suscriber.complete();
        }
      })
      })
      return httpCallObservable;
  }
 
}
