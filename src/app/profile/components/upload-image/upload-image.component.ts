import { Component, OnInit } from '@angular/core';
import { BannerData, BannerService } from '../../../shared/services/banner.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-upload-image',
  imports: [NgIf],
  templateUrl: './upload-image.component.html',
  styles: ``,
  providers : [

  ]
})
export class UploadImageComponent implements OnInit {

  public receiveData ?: BannerData 
  public state : boolean = true

  constructor(
    private bannerService : BannerService,
    public config : DynamicDialogConfig,
    public ref : DynamicDialogRef
  ) {
    
  }

  ngOnInit(): void {
    this.receiveData = this.config.data
    this.uploadImage();
  }

  uploadImage():void{
    if (!this.receiveData) return
    this.bannerService.updateBanner(this.receiveData.id,this.receiveData.file).subscribe({
      next: (data) => {
        this.ref.close(true)
      },error: (err) => {
        this.state = false
        setTimeout(() => {
          this.ref.close(false)
        }, 2000);
      }
    })
  }

}
