import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  formData: Product= new Product();
  readonly baseURL = 'https://localhost:44390/api/Products';
  list: Product[] = [];

  postProduct() {
    return this.http.post(this.baseURL, this.formData);
  }
  putProduct() {
    return this.http.put(`${this.baseURL}/${this.formData.idProduct}`, this.formData);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as Product[]);
  }
}
