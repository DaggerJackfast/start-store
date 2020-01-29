import { Component } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent {
  products: Product[] = [];
  error: any;
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProducts().subscribe(
      data => (this.products = data),
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }
  share() {
    window.alert("The product has been shared!");
  }

  onNotify() {
    window.alert("You will be notified when the product goes on sale");
  }
}
