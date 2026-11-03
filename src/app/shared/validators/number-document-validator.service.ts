import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NumberDocumentValidatorService {

  numberDocumentValidator = (control : AbstractControl ):ValidationErrors | null => {
    const parent = control.parent;

    if (!parent) return null;

    const type = parent.get('documentType')?.value;
    const value = control.value;

    if (type === "DNI") {
      return /^\d{8}$/.test(value) ? null : { dniInvalido: true };
    }else if (type === "RUC"){
      return /^[A-Z0-9]{6,9}$/.test(value) ? null : { pasaporteInvalido: true };
    }
    return null
  }

}
