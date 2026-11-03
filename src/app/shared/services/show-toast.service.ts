import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowToastService {

  private showToat = new BehaviorSubject<boolean|null>(null);
  
  emitPopupClose(){
    this.showToat.next(true);
  }

  onPopupClosed(){
    return this.showToat.asObservable();
  }

  resertPopup(){
    this.showToat.next(null)
  }

}
