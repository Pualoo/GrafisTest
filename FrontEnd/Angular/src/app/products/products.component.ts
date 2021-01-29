import { ProductService } from '../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit {

  constructor(public service: ProductService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord : Product) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(IdProduct: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteProduct(IdProduct)
        .subscribe(res => {
          this.service.refreshList();
        },
        err => { console.log(err); })
    }
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:44390/${serverPath}`;
  }

}
