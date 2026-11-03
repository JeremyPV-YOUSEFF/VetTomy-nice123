import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';

@Component({
  selector: 'store-counter-stock',
  imports: [CurrencyPipe],
  templateUrl: './counter-stock.component.html',
  styles: ``
})
export class CounterStockComponent implements OnInit {

  @Input() type : number | null = null
  @Input() idProduct : number  = 0
  @Input() price : number  = 0
  @Input() stock : number | null = 0
  @Output() sendValue : EventEmitter<number> = new EventEmitter<number>();
  @Input() value : number = 1

  constructor(
    private shoppingCart : ShoppingCartService
  ) {
    if (!this.stock) return;
  }

  ngOnInit(): void {
    this.sendValue.emit(this.value);
  }

  increase():void{
    if (this.stock && (this.value < this.stock) ) {
      this.value ++
      this.sendValue.emit(this.value);
      if (this.idProduct!=0) {
        this.shoppingCart.changeQuantity(this.idProduct,this.value)
      }
    }
  }

  decrease():void{
    if (this.stock && this.value > 1 ) {
      this.value--
      this.sendValue.emit(this.value);
      if (this.idProduct!=0) {
        this.shoppingCart.changeQuantity(this.idProduct,this.value)
      }
    }
  }

}
