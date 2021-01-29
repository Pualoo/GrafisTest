import { Request } from './request.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) { }

  formData: Request= new Request();
  readonly baseURL = 'https://localhost:44390/api/Requests';
  list: Request[] = [];

  postRequest() {
    return this.http.post(this.baseURL, this.formData);
  }
  putRequest() {
    return this.http.put(`${this.baseURL}/${this.formData.idRequest}`, this.formData);
  }
  deleteRequest(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as Request[]);
  }
}
