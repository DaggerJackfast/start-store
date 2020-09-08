import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Product, Response, Shipping } from './models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  itemsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  addToCart(product: Product): void {
    this.items.push(product);
    this.updateItemsCount();
  }

  removeFromCart(productId: number): void {
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

  private updateItemsCount(): void {
    this.itemsCount.next(this.items.length);
  }

  getShippingPrices(): Observable<Shipping[]> {
    return this.http.get<Shipping[]>(`${environment.APIEndpoint}/shipping`);
  }

  checkoutOrder(customer: any): Observable<Response> {
    const order = { customer, items: this.items};
    return this.http.post<Response>(`${environment.APIEndpoint}/order/checkout`, order);
  }
}
