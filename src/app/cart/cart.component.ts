import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  submitted: boolean = false;
  constructor(
    private cartService: CartService,
    private formBuider: FormBuilder,
    private notifier: NotifierService
  ) {
    this.items = this.cartService.getItems();
    this.checkoutForm = this.formBuider.group({
      "name": ["", [Validators.required]],
      "address": ["", [Validators.required]]
    });
  }
  remoteFromCart(item: Product){
    this.cartService.removeFromCart(item.id);
  }
  onSubmit(customer: any) {
    this.submitted = true;
    if(this.checkoutForm.invalid) return;
    this.cartService.checkoutOrder(customer).subscribe(data => {
      this.reset();
      this.notifier.notify('success', data.message);
    });    
  }

  private reset(){
    this.items = this.cartService.clearCart();
    this.submitted = false;
    this.checkoutForm.reset();
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }
}
