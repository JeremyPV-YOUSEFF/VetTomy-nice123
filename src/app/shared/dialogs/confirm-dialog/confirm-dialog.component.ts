import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styles: ``
})
export class ConfirmDialogComponent {

  constructor(public ref : DynamicDialogRef) {
    
  }

  closePopup():void{
    this.ref.close()
  }

}
