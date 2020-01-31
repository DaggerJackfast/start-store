import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NotifierService } from "angular-notifier";
import { CartService } from "../cart.service";
import { Product } from "../domains";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  items: Product[];
  checkoutForm: FormGroup;
  constructor(
    private cartService: CartService,
    private formBuider: FormBuilder,
    private notifier: NotifierService
  ) {
    this.items = this.cartService.getItems();
    this.checkoutForm = this.formBuider.group({
      name: "",
      address: ""
    });
  }
  remoteFromCart(item: Product){
    this.cartService.removeFromCart(item.id);
  }
  onSubmit(customer: any) {
    this.cartService.checkoutOrder(customer).subscribe(data => {
      console.log('print: ', data);
      this.notifier.notify('success', data.message);
    });
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }
}
