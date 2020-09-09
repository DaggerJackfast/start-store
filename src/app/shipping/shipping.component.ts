import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { Shipping } from '../core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  shippingCosts: Observable<Shipping[]>;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.shippingCosts = this.cartService.getShippingPrices();
  }
}
