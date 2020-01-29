import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Product } from "./product";
@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get("/assets/products.json").pipe(
      map((data: any[] | any) => {
        return data.map(function(product: any) {
          return {
            name: product.name,
            price: product.price,
            description: product.description
          };
        });
      }),
      catchError(err=>{
        return throwError(err);
      })
    );
  }
  getProduct(productId: number): Observable<Product> {
    return this.http.get("/assets/products.json").pipe(
      map((data: any[] | any) => {
        const product = data[productId];
        return {
          name: product.name,
          price: product.price,
          description: product.description
        };
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
