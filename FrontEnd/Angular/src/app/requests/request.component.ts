import { RequestService } from '../shared/request.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Request } from '../shared/request.model';
import { RequestProductService } from '../shared/request-product.service';
import { HttpClient } from '@angular/common/http';
import { RequestProduct } from '../shared/request-product.model';
import { Product } from '../shared/product.model';
import { element } from 'protractor';
import { RequestFormComponent } from './request-form/request-form.component';
import { Client } from '../shared/client.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styles: [
  ]
})
export class RequestComponent implements OnInit {
  listProducts: Product[] = [];
  listClients: Client[] = [];
  listRequestProduct: RequestProduct[] = [];
  constructor(public service: RequestService, private http: HttpClient, public component: RequestFormComponent) {}

  ngOnInit(){
    this.service.refreshList();
  }

  populateForm(selectedRecord : Request) {
    this.service.formData = Object.assign({}, selectedRecord);
    this.component.updateValues();
  }

  onDelete(IdRequest: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteRequest(IdRequest)
        .subscribe(res => {
          this.service.refreshList();
        },
        err => { console.log(err); })
    }
  }

  printProducts(request: Request){
    var i = 0;
    var listIdProducts = [] as number[];
    var listQuantityProducts = [] as number[];
    var stringRequestProduct = "";
    
    if(this.listProducts.length == 0 || this.listRequestProduct.length == 0){
      this.populateArrays();
    }

    this.listRequestProduct.forEach( element => {
      if(element.idRequest == request.idRequest){
        listIdProducts[i] = element.idProduct;
        listQuantityProducts[i] = element.quantityProduct;
        i++;
      }
    });

    this.listProducts.forEach( element => {
      listIdProducts.forEach(elementId => {
        if(element.idProduct == elementId){
          stringRequestProduct += element.nameProduct + " x" +  listQuantityProducts[listIdProducts.indexOf(elementId)] + ", ";
        }
      });
    });

    return stringRequestProduct;
  }

  printClients(request: Request){
    var stringEmailClient = "";
    if(this.listClients.length == 0){
      this.http.get('https://localhost:44390/api/Clients')
      .toPromise()
      .then(res =>this.listClients = res as Client[]);
    }
    
    this.listClients.forEach( element => {
      if(element.idClient == request.idClient){
        stringEmailClient = element.emailClient;
      }
    });

    return stringEmailClient;
  }

  populateArrays(){
    this.http.get('https://localhost:44390/api/Products')
      .toPromise()
      .then(res =>this.listProducts = res as Product[]);

    this.http.get('https://localhost:44390/api/RequestProducts')
      .toPromise()
      .then(res =>this.listRequestProduct = res as RequestProduct[]);
  }


}