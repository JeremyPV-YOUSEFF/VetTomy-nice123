import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'store-counter-start',
  imports: [NgClass],
  templateUrl: './counter-start.component.html',
  styles: ``
})
export class CounterStartComponent {
  @Input() ratingGeneral !: number  
  @Input() sizeStart !: string
}
