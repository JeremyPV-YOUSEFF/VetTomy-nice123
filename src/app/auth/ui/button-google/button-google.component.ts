import { Component, output } from '@angular/core';

@Component({
  selector: 'auth-button-google',
  imports: [],
  templateUrl: './button-google.component.html',
  styles: ``
})
export class ButtonGoogleComponent {

  onClick = output<void>();

}
