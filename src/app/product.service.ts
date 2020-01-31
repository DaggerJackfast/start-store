import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Product } from "./domains";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get(`${environment.APIEndpoint}/products`).pipe(
      map((data: any[] | any) => {
        return data.map(function(product: any) {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description
          };
        });
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this.http
      .get(`${environment.APIEndpoint}/products/${productId}`)
      .pipe(
        map((data: any[] | any) => {
          return {
            id: data.id,
            name: data.name,
            price: data.price,
            description: data.description
          };
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }
}
