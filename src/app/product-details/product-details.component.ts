import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../core/services/cart.service';
import { ProductService } from '../core/services/product.service';
import { Product } from '../core/models';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productService.getProduct(+params.get('productId')).subscribe(
        data => (this.product = data),
        error => {
          this.error = error.message;
          console.log(error);
        }
      );
    });
  }

  addToCart(product: Product): void {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
}
