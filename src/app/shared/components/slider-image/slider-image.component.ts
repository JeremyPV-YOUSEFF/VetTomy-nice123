import { Component, Input } from '@angular/core';
import { TypeBusinessImage, ShortBusinessImage } from '../../interfaces/businessImage.interface';
import { BusinessImageService } from '../../services/business-image.service';
import { NgClass, NgIf } from '@angular/common';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'shared-slider-image',
  imports: [NgClass,NgIf,ProgressBar],
  templateUrl: './slider-image.component.html',
  styleUrl: './slider-image.component.css',
  styles: ``
})
export class SliderImageComponent {

  @Input() type !: TypeBusinessImage
  public ListImage : ShortBusinessImage[] = [] 
  public image : string  = ''
  public num : number = 1 ;
  public imageInterval ?: any
  public onLoad : boolean = true

  constructor (
    private businessImageService : BusinessImageService
  ) {}

  ngOnInit(): void {
    this.getImages()
  }

  ngOnDestroy(): void {
    if (this.imageInterval) {
      clearInterval(this.imageInterval)
    }
  }

  getImages(){
    this.businessImageService.getImages(this.type).subscribe({
      next: (data) => {
        this.ListImage = data
        this.changeImage()
      }
    })
  }
  
  changeImage(){
    this.image = this.ListImage[0].url
    this.imageInterval = setInterval(() => {
      const newImage = this.num % this.ListImage.length
      this.image = this.ListImage[newImage].url
      this.num ++;
    }, 5000);
  }

  onLoadImage():void{
    this.onLoad = false
  }
}
