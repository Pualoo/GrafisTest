import { RequestService } from './../../shared/request.service';
import { Request } from 'src/app/shared/request.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import {FormArray, FormBuilder, FormGroup, FormControl, ValidatorFn} from '@angular/forms';
import { Client } from 'src/app/shared/client.model';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/shared/product.model';
import { RequestProduct } from 'src/app/shared/request-product.model';


@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styles: [
  ]
})
export class RequestFormComponent implements OnInit {
  myForm: FormGroup;
  clientsArray: Client[] = [];
  productsArray: Product[] = [];
  formSubmit: NgForm;
  valueRequest: number = 0;
  valueTotal: number = 0;
  discountRequest: number = 0;
  inputDiscount: any;
  invalidValueTotal: boolean = false;

  constructor(public service: RequestService, private toastr:ToastrService, private fb: FormBuilder, private http: HttpClient) {
    this.myForm = FormGroup.prototype;
    this.formSubmit = NgForm.prototype;
    this.createForm();
    this.myForm.valueChanges.subscribe(console.table);
    this.myForm.valueChanges.subscribe(x => {this.adjustValues()} );
  }

  ngOnInit(): void {
    this.service.refreshList();
    this.clientList();
    this.productList();
    this.addProduct();
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Request();
  }
  
  insertRecord(form: NgForm) {
    this.service.postRequest().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        window.location.reload();
        this.toastr.success('Submitted succefully','Request');
      },
      err => { 
        console.log(err);
        this.toastr.error('Erro ao cadastrar! verifique os campos do formulário e tente novamente.','Request');
       }
    )
  }

  onSubmit(form: FormGroup) {
    this.formSubmit.form = form;
    this.service.formData.requestProducts = []; 
    this.setValues();
    if (this.service.formData.idRequest == 0)
      this.insertRecord(this.formSubmit);
    else
      this.updateRecord(this.formSubmit);
  }
  
  updateRecord(form: NgForm) {
    this.service.putRequest().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        window.location.reload();
        this.toastr.success('Submitted succefully','Product');
      },
      err => { 
        console.log(err);
        this.toastr.error('Erro ao atualizar o cadastro! verifique os campos do formulário e tente novamente.' ,'Request');
       }
    )
  }

  createForm() {
    this.myForm = this.fb.group({
      idRequest: [0],
      numberRequest: [0],
      dateRequest: [new Date()],
      requestProducts: this.fb.array([]),
      idClient: [],
      valueRequest: [0],
      discountRequest: [0],
      totalValue: [0],
    });
  }

  get ProductForm() {
    return this.myForm.get('requestProducts') as FormArray;
  }

  addProduct() {
    const productGroup = this.fb.group({
      idProduct: [],
      idRequest: [0],
      quantityProduct: [1]
    });
    this.ProductForm.push(productGroup);
  }

  deleteProduct(i: number) {
    this.ProductForm.removeAt(i);
  }

  clientList() {
    this.http.get('https://localhost:44390/api/Clients')
      .toPromise()
      .then(res =>this.clientsArray = res as Client[]);
  }

  productList() {
    this.http.get('https://localhost:44390/api/Products')
      .toPromise()
      .then(res =>this.productsArray = res as Product[]);
  }

  setValues(){
    this.service.formData.idClient = this.myForm.controls['idClient'].value;
    this.service.formData.requestProducts = this.myForm.controls['requestProducts'].value;
    this.service.formData.discountRequest = this.myForm.controls['discountRequest'].value;
  }

  updateValues(){
    this.myForm.controls['idClient'].setValue(this.service.formData.idClient);
    this.service.formData.requestProducts.reduce;
    //this.myForm.setValue(this.service.formData)
    //this.myForm.controls['requestProducts'].setValue(this.service.formData.requestProducts);
    this.myForm.controls['discountRequest'].patchValue(this.service.formData.discountRequest);
    // this.discountRequest = this.service.formData.discountRequest
    
  }

  adjustValues(){
    if(this.myForm.controls['requestProducts'].value != undefined){
      var listRequestProduct = [] as RequestProduct[];
      listRequestProduct = this.myForm.controls['requestProducts'].value;
      this.productList();
      this.valueRequest = 0;
      this.valueTotal = 0;
      listRequestProduct.forEach(elementRequestProduct =>{
        this.productsArray.forEach(elementProduct => {
          if(elementRequestProduct.idProduct == elementProduct.idProduct){
            this.valueRequest += elementProduct.valueProduct * elementRequestProduct.quantityProduct;
            this.invalidValueTotal = false;
          }
        });
      });
      this.valueTotal = this.valueRequest - this.myForm.controls['discountRequest'].value;
      if(this.valueTotal<0){
        this.toastr.warning('O valor do desconto não pode ser maior que o valor total do pedido.' ,'Request');
        this.invalidValueTotal = true
      }
    }
  }
}
