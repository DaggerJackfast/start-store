import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { CartService } from '../core/services/cart.service';
import { Product } from '../core/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Product[];
  checkoutForm: FormGroup;
  submitted = false;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {
    this.items = this.cartService.getItems();
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }
  remoteFromCart(item: Product): void {
    this.cartService.removeFromCart(item.id);
  }

  onSubmit(customer: any): void {
    this.submitted = true;
    if(this.checkoutForm.invalid) return;
    this.cartService.checkoutOrder(customer).subscribe(data => {
      this.reset();
      this.notifier.notify('success', data.message);
    });
  }

  private reset(): void {
    this.items = this.cartService.clearCart();
    this.submitted = false;
    this.checkoutForm.reset();
  }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }
}
