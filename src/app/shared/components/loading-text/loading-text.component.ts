import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loading-text',
  imports: [NgFor],
  templateUrl: './loading-text.component.html',
  styles: ``
})
export class LoadingTextComponent {
  @Input() data : string | undefined  = '' 
  @Input() quantity : number | null = null
  @Input() type : number | null = null
}
