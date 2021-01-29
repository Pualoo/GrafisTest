
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from "@angular/common/http";
import { RequestProduct } from './request-product.model';
@Injectable({
  providedIn: 'root'
})
export class RequestProductService {

  constructor(private http: HttpClient) { }
  
  formData: RequestProduct= new RequestProduct();
  readonly baseURL = 'https://localhost:44390/api/RequestProductProducts';
  list: RequestProduct[] = [];

  postRequestProduct() {
    return this.http.post(this.baseURL, this.formData);
  }
  putRequestProduct() {
    return this.http.put(`${this.baseURL}/${this.formData.idRequest}`, this.formData);
  }
  deleteRequestProduct(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as RequestProduct[]);
  }

}
