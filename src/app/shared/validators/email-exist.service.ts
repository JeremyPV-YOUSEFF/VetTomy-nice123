import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, delay, filter, map, Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { DontRepeatEmail, DontRepeatEmailClass } from '../interfaces/emailExits.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailExistService implements AsyncValidator {

  constructor (private authService : AuthenticationService) {}

  validate(control: AbstractControl):  Observable<ValidationErrors | null> {
    const email = control.value;
    const data = new DontRepeatEmailClass(
      email
    )
    const httpCallObservable = new Observable<ValidationErrors|null>((suscriber) => {
      if (data.email.length < 0) return; 
      this.authService.emailExist(data)
        .pipe(
          delay(3000)
        )
        .subscribe((data)=> {
            if (data.valid) {
              suscriber.next(null);
              suscriber.complete
            }else{
              suscriber.next({emailTaken:true});
              suscriber.complete();
            }
          }
        )
    })
    return httpCallObservable;
  }

}
