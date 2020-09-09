import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { Product } from '../core/models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  error: any;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      data => (this.products = data),
      error => {
        this.error = error.message;
        console.log(error);
      }
    );
  }

  share(): void {
    window.alert('The product has been shared!');
  }

  onNotify(): void {
    window.alert('You will be notified when the product goes on sale');
  }
}
