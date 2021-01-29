import { ClientService } from '../shared/client.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '../shared/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styles: [
  ]
})
export class ClientsComponent implements OnInit {

  constructor(public service: ClientService) { }

  ngOnInit(){
    this.service.refreshList();
  }

  populateForm(selectedRecord : Client) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(IdClient: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteClient(IdClient)
        .subscribe(res => {
          this.service.refreshList();
        },
        err => { console.log(err); })
    }
  }

}
