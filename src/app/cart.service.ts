import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Product, Response } from "./domains";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CartService {
  items: Product[] = [];
  itemsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {}
  addToCart(product: Product) {
    this.items.push(product);
    this.updateItemsCount();
  }
  removeFromCart(productId: number) {
    this.items.splice(productId, 1);
    this.updateItemsCount();
  }
  getItems(): Product[] {
    return this.items;
  }
  clearCart(): Product[] {
    this.items = [];
    this.updateItemsCount();
    return this.items;
  }
  private updateItemsCount() {
    return this.itemsCount.next(this.items.length);
  }

  getShippingPrices() {
    return this.http.get(`${environment.APIEndpoint}/shipping`);
  }
  checkoutOrder(customer: any) {
    const order = { customer, items: this.items };
    return this.http.post<Response>(
      `${environment.APIEndpoint}/order/checkout`,
      order
    );
  }
}
