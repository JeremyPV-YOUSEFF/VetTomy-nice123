import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PaymentStepsService, PaymentStepsState } from '../../../../shared/services/payment-steps.service';

@Component({
  selector: 'app-checkout-basic-page',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './checkout-basic-page.component.html',
  styles: ``,
  styleUrl: './checkout-basic-page.component.css'
})
export class CheckoutBasicPageComponent implements OnInit {

  public paymentStepsData : PaymentStepsState | undefined = undefined

  constructor(
    private paymentSteps : PaymentStepsService
  ) {
    this.getValue();
  }

  ngOnInit(): void {
    this.getValue();
  }

  getValue():void{
    this.paymentSteps.valuePayment.subscribe({
      next: (data) => {
        this.paymentStepsData = data;
      }
    })
  }

}
