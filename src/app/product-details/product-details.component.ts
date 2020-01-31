import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "../cart.service";
import { ProductService } from "../product.service";
import { Product } from "../domains";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  error: any;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productService.getProduct(+params.get("productId")).subscribe(
        data => (this.product = data),
        error => {
          this.error = error.message;
          console.log(error);
        }
      );
    });
  }
  addToCart(product: Product) {
    window.alert("Your product has been added to the cart!");
    this.cartService.addToCart(product);
  }
}
