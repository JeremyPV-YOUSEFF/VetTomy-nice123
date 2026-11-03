import { Component, Input, output } from '@angular/core';
import { State } from '../../interfaces/state.interface';

@Component({
  selector: 'shared-button-custome',
  imports: [],
  templateUrl: './button-custome.component.html',
  styles: ``
})
export class ButtonCustomeComponent {

  @Input() type : '' | 'button' | 'submit' = 'submit' 
  @Input() text = ''
  
  state  = output<string>();

  onClick = output<void>();

}
