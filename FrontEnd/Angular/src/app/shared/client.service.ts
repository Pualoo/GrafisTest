import { Client } from './client.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  formData: Client= new Client();
  readonly baseURL = 'https://localhost:44390/api/Clients';
  public list: Client[] = [];


  postClient() {
    return this.http.post(this.baseURL, this.formData);
  }
  putClient() {
    return this.http.put(`${this.baseURL}/${this.formData.idClient}`, this.formData);
  }
  deleteClient(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as Client[]);
  }
}
