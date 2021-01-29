import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent} from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { RequestComponent } from './requests/request.component';

const routes: Routes = [
  {path: 'client', component: ClientsComponent },
  {path: 'product', component: ProductsComponent },
  {path: 'request', component: RequestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
