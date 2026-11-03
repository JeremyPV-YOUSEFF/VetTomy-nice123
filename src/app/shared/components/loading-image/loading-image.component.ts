import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loading-image',
  imports: [NgClass,NgIf],
  templateUrl: './loading-image.component.html',
  styles: ``
})
export class LoadingImageComponent {

  @Input() urlImage : string | null = null;
  @Input() altImage : string | null = null;
  @Input() classStyle : string = '';


  public state : boolean = false
  public loadImage : boolean = true
  public errorImage : boolean = false
  public stateTime : any

  ngOnInit(): void {
    this.resetTimer();
  }

  resetTimer():void{
    if (this.stateTime) {
      clearTimeout(this.stateTime);
    }

    this.stateTime = setTimeout(() => {
      if (!this.state) {
        this.loadImage = false;
        this.errorImage = true;
      }
    }, 10000);
  }

  onLoadImage():void{
    this.loadImage = false
    this.state = true
    this.resetTimer();
  }

}
