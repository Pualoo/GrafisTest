import { ProductService } from './../../shared/product.service';
import { Product } from 'src/app/shared/product.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  public response: { dbPath: '' };

  constructor(public service: ProductService, private toastr:ToastrService) { 
    this.response = { dbPath: '' };
  }

  ngOnInit(): void {
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Product();
  }
  
  insertRecord(form: NgForm) {
    this.service.postProduct().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted succefully','Product');
      },
      err => { 
        console.log(err);
        this.toastr.error('Erro ao cadastrar! verifique os campos do formulário e tente novamente.','Product');
       }
    )
  }

  onSubmit(form: NgForm) {
    form.controls['imgPath'].patchValue(this.response.dbPath);
    if (this.service.formData.idProduct == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }
  
  updateRecord(form: NgForm) {
    this.service.putProduct().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted succefully','Product');
      },
      err => { 
        console.log(err);
        this.toastr.error('Erro ao atualizar o cadastro! verifique os campos do formulário e tente novamente.','Product');
       }
    )
  }

  public uploadFinished = (event: any) => {
    this.response = event;
  }
}
