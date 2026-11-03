import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProductData } from '../../../../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { SharedModule } from "../../../../shared/shared.module";
import { LoadingImageComponent } from "../../../../shared/components/loading-image/loading-image.component";
@Component({
  imports: [RouterLink, CurrencyPipe, SharedModule],
  templateUrl: './confirm-product.component.html',
  styles: ``
})
export class ConfirmProductComponent implements OnInit {

  public productData !: ProductData

  constructor(
    public ref : DynamicDialogRef,
    private config : DynamicDialogConfig
  ) {
    
  }

  ngOnInit(): void {
    if(!this.config.data) return;
    this.productData = this.config.data
  }

}
