import { ClientService } from './../../shared/client.service';
import { Client } from 'src/app/shared/client.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styles: [
  ]
})
export class ClientFormComponent implements OnInit {

  constructor(public service: ClientService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Client();
  }
  
  insertRecord(form: NgForm) {
    this.service.postClient().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted succefully','Client');
      },
      err => { 
        console.log(err);
        this.toastr.error('Erro ao cadastrar! verifique os campos do formulário e tente novamente.','Cliente');
       }
    )
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.idClient == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }
  
  updateRecord(form: NgForm) {
    this.service.putClient().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Erro ao atualizar o cadastro! verifique os campos do formulário e tente novamente.','Cliente');
      }
    )
  }

}
