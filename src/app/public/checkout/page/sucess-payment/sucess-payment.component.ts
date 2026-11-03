import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SaleService } from '../../../../shared/services/sale.service';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';
import { Sale, SaleData } from '../../../../shared/interfaces/sale.interface';
import { PaymentStepsService } from '../../../../shared/services/payment-steps.service';
import { NubeFactService } from '../../../../shared/services/nube-fact.service';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { NubeFactRequest } from '../../../../shared/interfaces/nubeFact.interface';

@Component({
  selector: 'app-sucess-payment',
  imports: [RouterLink],
  templateUrl: './sucess-payment.component.html',
  styles: ``
})
export class SucessPaymentComponent implements OnInit {

  public sale : Sale | undefined = undefined

  constructor(
    private saleService : SaleService,
    private shoppingCart  : ShoppingCartService,
    private paymentSteps : PaymentStepsService,
    private nubeFact : NubeFactService,
    private auth :  AuthenticationService
  ) {
    
  }

  ngOnInit(): void {
    this.recieveData
    this.getValueSale();
    setTimeout(() => {
      this.newSale();
    }, 2000);
    this.paymentSteps.deleteSteps();
    this.saleService.deleteReceipType();
  }

  get recieveData (){
    return this.auth.profileData
  }

  getValueSale():void{
    this.saleService.valueSaleData.subscribe({
      next: (data) => {
        this.sale = data
      }
    })
  }

  newSale():void{
    if (!this.sale) return;
    this.saleService.newSale(this.sale).subscribe({
      next: (data) => {
        this.shoppingCart.deleteAllCart();
        this.saleService.deleteEvidende();
        this.shoppingCart.deleteCartTotal();
        if (this.recieveData) {
          const newData : NubeFactRequest = {} as NubeFactRequest
          newData.idPerson = this.recieveData.id;
          newData.idSale = data.saleNumber
          this.nubeFact.newNubeFactByProduct(newData).subscribe({
          })
        }
      }
    })
  }

}
