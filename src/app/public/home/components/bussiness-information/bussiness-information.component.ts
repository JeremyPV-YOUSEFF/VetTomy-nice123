import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Business } from '../../../../shared/interfaces/business.interface';
import { BusinessService } from '../../../../shared/services/business.service';
import { SharedModule } from 'primeng/api';
import { NgIf } from '@angular/common';
import { LoadingTextComponent } from '../../../../shared/components/loading-text/loading-text.component';

@Component({
  selector: 'home-bussiness-information',
  imports: [SharedModule,NgIf,LoadingTextComponent],
  templateUrl: './bussiness-information.component.html',
  styles: ``
})
export class BussinessInformationComponent implements  OnChanges {

  @Input() data : Business | null = null
  public informationBusiness : Business | null = null
  public hidden : boolean = false

  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (!this.data) return;
      this.informationBusiness = this.data        
    }
  }

  changeState(){
    this.hidden = !this.hidden
  }

}
