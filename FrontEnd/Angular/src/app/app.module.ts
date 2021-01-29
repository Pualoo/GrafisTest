import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientFormComponent } from './clients/client-form/client-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { ProductsFormComponent } from './products/products-form/products-form.component';
import { UploadComponent } from './upload/upload.component';
import { RequestComponent } from './requests/request.component';
import { RequestFormComponent } from './requests/request-form/request-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientFormComponent,
    ProductsComponent,
    ProductsFormComponent,
    UploadComponent,
    RequestComponent,
    RequestFormComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
